import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Read existing content
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    let existing: Record<string, any> = {};
    try {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch { /* file may not exist */ }
    
    // Merge - handle nested objects
    if (data.hero) existing.hero = { ...existing.hero, ...data.hero };
    if (data.about) {
      existing.about = { ...existing.about, ...data.about };
      if (data.about.features) {
        existing.about.features = String(data.about.features).split(',').map((s: string) => s.trim()).filter(Boolean);
      }
    }
    if (data.contact) existing.contact = { ...existing.contact, ...data.contact };
    if (data.footer) existing.footer = { ...existing.footer, ...data.footer };
    
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ success: false, message: 'Failed to save' }, { status: 500 });
  }
}
