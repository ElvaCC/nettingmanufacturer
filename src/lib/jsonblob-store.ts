/**
 * JSONBlob storage for content persistence on Vercel.
 * Free, no authentication, no env vars needed.
 * Data is stored in a remote JSON blob and accessed via REST API.
 */

const BLOB_ID = '019e8c82-3f48-7f19-9182-85eadc458025';
const BLOB_URL = `https://jsonblob.com/api/jsonBlob/${BLOB_ID}`;

export async function getContentOverride(): Promise<Record<string, any> | null> {
  try {
    const res = await fetch(BLOB_URL, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return null;

    const data = await res.json();
    // Ignore initialization marker
    if (data._init) return null;
    return data as Record<string, any>;
  } catch {
    return null;
  }
}

export async function setContentOverride(data: Record<string, any>): Promise<boolean> {
  try {
    const res = await fetch(BLOB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
