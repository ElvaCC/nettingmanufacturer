/**
 * Vercel Blob storage for content persistence.
 * Data stored in Vercel Blob never expires.
 * Requires BLOB_READ_WRITE_TOKEN env var (auto-injected by Vercel when Blob store is created).
 */

import { put, del, head, list } from '@vercel/blob';

const CONTENT_KEY = 'site-content';

export async function getContentOverride(): Promise<Record<string, any> | null> {
  try {
    // List blobs to find our content file
    const { blobs } = await list({ prefix: CONTENT_KEY });
    if (blobs.length === 0) return null;

    const blob = blobs.find(b => b.pathname === `${CONTENT_KEY}.json`);
    if (!blob) return null;

    const res = await fetch(blob.url, { cache: 'no-store' });
    if (!res.ok) return null;

    return await res.json() as Record<string, any>;
  } catch (err) {
    console.warn('[VercelBlob] getContentOverride failed:', err);
    return null;
  }
}

export async function setContentOverride(data: Record<string, any>): Promise<boolean> {
  try {
    await put(`${CONTENT_KEY}.json`, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false, // Always overwrite the same file
    });
    return true;
  } catch (err) {
    console.error('[VercelBlob] setContentOverride failed:', err);
    return false;
  }
}
