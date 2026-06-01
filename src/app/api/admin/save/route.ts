import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const filePath = path.join(process.cwd(), 'src/data/content.json');
    let existing: Record<string, any> = {};
    try {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch { /* file may not exist */ }

    // Merge each section
    if (data.hero) existing.hero = { ...existing.hero, ...data.hero };
    if (data.about) {
      existing.about = { ...existing.about, ...data.about };
      if (data.about.features && typeof data.about.features === 'string') {
        existing.about.features = data.about.features.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      if (data.about.stats && Array.isArray(data.about.stats)) {
        existing.about.stats = data.about.stats;
      }
    }
    if (data.contact) existing.contact = { ...existing.contact, ...data.contact };
    if (data.footer) existing.footer = { ...existing.footer, ...data.footer };
    if (data.factory) existing.factory = { ...existing.factory, ...data.factory };
    if (data.products) existing.products = data.products;
    if (data.blog) existing.blog = data.blog;

    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');

    // Trigger ISR revalidation for all pages
    try {
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';
      await fetch(`${baseUrl}/api/revalidate`, { method: 'POST' });
    } catch { /* revalidation is optional */ }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}
