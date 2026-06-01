import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getContentOverride, setContentOverride } from '@/lib/jsonblob-store';

export async function POST(request: NextRequest) {
  try {
    const patch = await request.json();

    // 1. Load current full data (from GitHub API or local file)
    let existing: Record<string, any> = (await getContentOverride()) || {};
    if (!Object.keys(existing).length) {
      try {
        const filePath = path.join(process.cwd(), 'src/data/content.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        existing = JSON.parse(raw);
      } catch {
        existing = {};
      }
    }

    // 2. Merge patch into existing
    if (patch.hero) existing.hero = { ...existing.hero, ...patch.hero };
    if (patch.about) {
      existing.about = { ...existing.about, ...patch.about };
      if (patch.about.features && typeof patch.about.features === 'string') {
        existing.about.features = patch.about.features.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      if (patch.about.stats && Array.isArray(patch.about.stats)) {
        existing.about.stats = patch.about.stats;
      }
    }
    if (patch.contact) existing.contact = { ...existing.contact, ...patch.contact };
    if (patch.footer) existing.footer = { ...existing.footer, ...patch.footer };
    if (patch.factory) existing.factory = { ...existing.factory, ...patch.factory };
    if (patch.products) existing.products = patch.products;
    if (patch.blog) existing.blog = patch.blog;

    // 3. Save to GitHub (persistent)
    const saved = await setContentOverride(existing);

    // 4. Also update local file (for development fallback)
    try {
      const filePath = path.join(process.cwd(), 'src/data/content.json');
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
    } catch { /* Vercel read-only, ignore */ }

    if (!saved) {
      return NextResponse.json({ success: false, message: 'Failed to save to remote storage' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}
