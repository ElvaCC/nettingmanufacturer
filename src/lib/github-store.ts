/**
 * GitHub-based content storage.
 * Reads from GitHub raw URL (public repo, no auth needed).
 * Writes via GitHub Contents API (needs a credential).
 * Content persists in the repo — never expires.
 *
 * Credential modes (优先 GitHub App，永远不过期):
 *   1. GitHub App:  GH_APP_ID + GH_APP_PRIVATE_KEY + GH_INSTALLATION_ID
 *                   → installation token 每 1 小时自动轮换，无需人工更换
 *   2. Classic/Personal token: GITHUB_TOKEN（有有效期，到期需更换）
 */

import crypto from 'crypto';

const GITHUB_REPO = 'ElvaCC/nettingmanufacturer';
const CONTENT_PATH = 'src/data/content.json';
const BRANCH = 'main';

const RAW_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/${BRANCH}/${CONTENT_PATH}`;

let cachedSha: string | null = null;
let cachedData: Record<string, any> | null = null;
let cacheTime: number = 0;
const CACHE_TTL = 30_000; // 30 seconds

/** GitHub App installation token 缓存（过期前 5 分钟自动刷新） */
let cachedInstallationToken: { token: string; expiresAt: number } | null = null;

/**
 * 获取写入 GitHub 的凭证：
 * - 优先 GitHub App（token 自动轮换，永不过期）
 * - 其次 GITHUB_TOKEN 环境变量
 */
export async function getGithubToken(): Promise<string | null> {
  if (process.env.GH_APP_ID && process.env.GH_APP_PRIVATE_KEY && process.env.GH_INSTALLATION_ID) {
    return getAppInstallationToken();
  }
  return process.env.GITHUB_TOKEN || null;
}

/** 用 GitHub App 私钥动态签发 installation token（RS256 JWT → POST /access_tokens） */
async function getAppInstallationToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedInstallationToken && cachedInstallationToken.expiresAt > now + 5 * 60 * 1000) {
    return cachedInstallationToken.token;
  }
  try {
    const appId = process.env.GH_APP_ID as string;
    const installationId = process.env.GH_INSTALLATION_ID as string;
    // Vercel 环境变量里的换行会被转义成 \n，需要还原
    const privateKey = (process.env.GH_APP_PRIVATE_KEY as string).replace(/\\n/g, '\n');

    const iat = Math.floor(Date.now() / 1000) - 60;
    const exp = iat + 9 * 60; // JWT 有效期 9 分钟
    const b64 = (s: string) => Buffer.from(s).toString('base64url');
    const header = b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const payload = b64(JSON.stringify({ iat, exp, iss: appId }));
    const signature = crypto
      .createSign('RSA-SHA256')
      .update(`${header}.${payload}`)
      .sign(privateKey)
      .toString('base64url');
    const jwt = `${header}.${payload}.${signature}`;

    const res = await fetch(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    );
    if (!res.ok) {
      const body = await res.text();
      console.error('[GitHubStore] Failed to get installation token:', res.status, body.slice(0, 300));
      return null;
    }
    const data = await res.json();
    cachedInstallationToken = {
      token: data.token as string,
      expiresAt: new Date(data.expires_at as string).getTime(),
    };
    return cachedInstallationToken.token;
  } catch (err) {
    console.error('[GitHubStore] getAppInstallationToken failed:', err);
    return null;
  }
}

export async function getContentOverride(): Promise<Record<string, any> | null> {
  // Use in-memory cache for repeated reads
  const now = Date.now();
  if (cachedData && now - cacheTime < CACHE_TTL) {
    return cachedData;
  }

  try {
    const res = await fetch(RAW_URL + '?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) {
      console.warn('[GitHubStore] Failed to fetch content:', res.status);
      return null;
    }
    cachedData = await res.json() as Record<string, any>;
    cacheTime = now;
    return cachedData;
  } catch (err) {
    console.warn('[GitHubStore] getContentOverride failed:', err);
    return null;
  }
}

export async function setContentOverride(data: Record<string, any>): Promise<{ ok: boolean; error?: string }> {
  const token = await getGithubToken();
  if (!token) {
    console.error('[GitHubStore] No GitHub credential configured');
    return {
      ok: false,
      error:
        '未配置 GitHub 凭据：请在 Vercel → Settings → Environment Variables 设置 GITHUB_TOKEN（或 GitHub App 的 GH_APP_ID / GH_APP_PRIVATE_KEY / GH_INSTALLATION_ID），然后 Redeploy。',
    };
  }

  // Fetch the CURRENT file SHA directly from GitHub every time (never trust cache),
  // otherwise saves fail with 409 conflict after git pushes change the file.
  async function fetchCurrentSha(): Promise<string | null> {
    try {
      const shaRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}?ref=${BRANCH}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
          cache: 'no-store',
        }
      );
      if (shaRes.ok) {
        const shaData = await shaRes.json();
        return shaData.sha as string;
      }
      return null;
    } catch (err) {
      console.error('[GitHubStore] fetchCurrentSha failed:', err);
      return null;
    }
  }

  try {
    // 1. Get current file SHA (required for update) — always fresh
    const currentSha = await fetchCurrentSha();

    const body: Record<string, any> = {
      message: `update: admin content update ${new Date().toISOString().split('T')[0]}`,
      content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
      branch: BRANCH,
    };
    if (currentSha) {
      body.sha = currentSha;
    }

    // 2. Update file via GitHub API (retry once on 409 conflict with a fresh SHA)
    let res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (res.status === 409 && body.sha) {
      // SHA went stale mid-request (someone else pushed) — refetch and retry once
      const freshSha = await fetchCurrentSha();
      if (freshSha) {
        body.sha = freshSha;
        res = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }
        );
      }
    }

    if (!res.ok) {
      const errBody = await res.text();
      console.error('[GitHubStore] Failed to update content:', res.status, errBody);
      if (res.status === 401) {
        return {
          ok: false,
          error: 'GitHub Token 已失效或被撤销（HTTP 401）。请到 Vercel 项目 → Settings → Environment Variables 更新 GITHUB_TOKEN，然后 Deployments 里 Redeploy 一次。',
        };
      }
      if (res.status === 403) {
        return {
          ok: false,
          error: 'GitHub Token 权限不足（HTTP 403）。请确认 token 勾选了 Contents: Read and write 权限。',
        };
      }
      return { ok: false, error: `GitHub API ${res.status}: ${errBody.slice(0, 300)}` };
    }

    // 3. Update cache
    const result = await res.json();
    cachedSha = result.content?.sha;
    cachedData = data;
    cacheTime = Date.now();

    return { ok: true };
  } catch (err) {
    console.error('[GitHubStore] setContentOverride failed:', err);
    return { ok: false, error: String(err) };
  }
}
