/**
 * GitHub Contents API storage for content persistence on Vercel.
 * Reads/writes content.json directly from GitHub repo.
 * Requires GITHUB_TOKEN env var on Vercel.
 */

const GITHUB_REPO = 'ElvaCC/nettingmanufacturer';
const CONTENT_PATH = 'src/data/content.json';
const BRANCH = 'main';

function getHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Authorization: token ? `token ${token}` : '',
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };
}

export async function getContentOverride(): Promise<Record<string, any> | null> {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return null;

    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}?ref=${BRANCH}`,
      { headers: getHeaders() }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function setContentOverride(content: Record<string, any>): Promise<boolean> {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return false;

    // 1. Get current file SHA (required for update)
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}?ref=${BRANCH}`,
      { headers: getHeaders() }
    );
    if (!getRes.ok) return false;

    const existing = await getRes.json();

    // 2. Update file via GitHub API
    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}`,
      {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          message: 'update: content change from admin panel',
          content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
          sha: existing.sha,
          branch: BRANCH,
        }),
      }
    );

    return putRes.ok;
  } catch {
    return false;
  }
}
