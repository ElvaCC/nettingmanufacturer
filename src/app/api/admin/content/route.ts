import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getContentOverride } from '@/lib/github-store';

export async function GET() {
  try {
    // 1. Try GitHub API first (persistent store)
    const ghData = await getContentOverride();
    if (ghData) {
      const result = {
        hero: ghData.hero || { title: '', subtitle: '', cta1: '', cta2: '' },
        about: ghData.about || { title: '', subtitle: '', description: '', features: [], stats: [] },
        contact: ghData.contact || { email: '', phone: '', whatsapp: '', address: '', workingHours: '' },
        footer: ghData.footer || { company: '', copyright: '' },
        factory: ghData.factory || { title: '', subtitle: '', description: '', info: {}, process: [] },
        products: ghData.products || [],
        blog: ghData.blog || [],
        _source: 'github',
      };
      return NextResponse.json(result);
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
      _source: 'file',
    };

    return NextResponse.json(raw);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
