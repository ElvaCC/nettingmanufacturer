import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Return raw data (features stays as array, stats stays as array)
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
