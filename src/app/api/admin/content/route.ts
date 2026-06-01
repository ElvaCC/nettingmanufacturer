import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getContentOverride } from '@/lib/kv';

export async function GET() {
  try {
    // 1. Try KV first (persistent store on Vercel)
    const kvData = await getContentOverride();
    if (kvData) {
      return NextResponse.json(kvData);
    }

    // 2. Fallback to static content.json (build-time data)
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const raw = {
      hero: data.hero || { title: '', subtitle: '', cta1: '', cta2: '' },
      about: data.about || { title: '', subtitle: '', description: '', features: [], stats: [] },
      contact: data.contact || { email: '', phone: '', whatsapp: '', address: '', workingHours: '' },
      footer: data.footer || { company: '', copyright: '' },
      factory: data.factory || { title: '', subtitle: '', description: '', info: {}, process: [] },
      products: data.products || [],
      blog: data.blog || [],
    };

    return NextResponse.json(raw);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
