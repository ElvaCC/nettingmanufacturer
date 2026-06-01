import { kv } from '@vercel/kv';

const KV_KEY = 'site-content';

export async function getContentOverride(): Promise<Record<string, any> | null> {
  try {
    const data = await kv.get(KV_KEY);
    return data as Record<string, any> | null;
  } catch {
    // KV not configured or error - use fallback
    return null;
  }
}

export async function setContentOverride(data: Record<string, any>): Promise<boolean> {
  try {
    await kv.set(KV_KEY, data);
    return true;
  } catch {
    return false;
  }
}
