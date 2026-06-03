import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getContentOverride } from '@/lib/github-store';

// Force dynamic rendering - never cache this route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Try GitHub first (persistent, public read)
    const githubData = await getContentOverride();
    if (githubData) {
      const result = {
        hero: githubData.hero || { title: '', subtitle: '', cta1: '', cta2: '' },
        about: githubData.about || { title: '', subtitle: '', description: '', features: [], stats: [] },
        contact: githubData.contact || { email: '', whatsapp: '', wechat: '', address: '' },
        footer: githubData.footer || { company: '', copyright: '' },
        factory: githubData.factory || { title: '', subtitle: '', description: '', info: {}, process: [] },
        products: githubData.products || [],
        blog: githubData.blog || [],
        _source: 'github',
      };
      return NextResponse.json(result, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    // 2. Fallback to static content.json (build-time data)
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const result = {
      hero: data.hero || { title: '', subtitle: '', cta1: '', cta2: '' },
      about: data.about || { title: '', subtitle: '', description: '', features: [], stats: [] },
      contact: data.contact || { email: '', whatsapp: '', wechat: '', address: '' },
      footer: data.footer || { company: '', copyright: '' },
      factory: data.factory || { title: '', subtitle: '', description: '', info: {}, process: [] },
      products: data.products || [],
      blog: data.blog || [],
      _source: 'file',
    };

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
