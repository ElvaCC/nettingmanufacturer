/**
 * GitHub-based content storage.
 * Reads from GitHub raw URL (public repo, no auth needed).
 * Writes via GitHub Contents API (needs GITHUB_TOKEN env var).
 * Content persists in the repo — never expires.
 */

const GITHUB_REPO = 'ElvaCC/nettingmanufacturer';
const CONTENT_PATH = 'src/data/content.json';
const BRANCH = 'main';

const RAW_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/${BRANCH}/${CONTENT_PATH}`;

let cachedSha: string | null = null;
let cachedData: Record<string, any> | null = null;
let cacheTime: number = 0;
const CACHE_TTL = 30_000; // 30 seconds

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

export async function setContentOverride(data: Record<string, any>): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('[GitHubStore] GITHUB_TOKEN env var not set');
    return false;
  }

  try {
    // 1. Get current file SHA (required for update)
    if (!cachedSha) {
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
        cachedSha = shaData.sha;
      }
    }

    const body: Record<string, any> = {
      message: `update: admin content update ${new Date().toISOString().split('T')[0]}`,
      content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
      branch: BRANCH,
    };
    if (cachedSha) {
      body.sha = cachedSha;
    }

    // 2. Update file via GitHub API
    const res = await fetch(
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

    if (!res.ok) {
      const errBody = await res.text();
      console.error('[GitHubStore] Failed to update content:', res.status, errBody);
      return false;
    }

    // 3. Update cache with new SHA
    const result = await res.json();
    cachedSha = result.content?.sha;
    cachedData = data;
    cacheTime = Date.now();

    return true;
  } catch (err) {
    console.error('[GitHubStore] setContentOverride failed:', err);
    return false;
  }
}
