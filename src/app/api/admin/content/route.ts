import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getContentOverride } from '@/lib/vercel-blob-store';

// Force dynamic rendering - never cache this route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Try Vercel Blob first (persistent, never expires)
    const blobData = await getContentOverride();
    if (blobData) {
      const result = {
        hero: blobData.hero || { title: '', subtitle: '', cta1: '', cta2: '' },
        about: blobData.about || { title: '', subtitle: '', description: '', features: [], stats: [] },
        contact: blobData.contact || { email: '', whatsapp: '', wechat: '', address: '' },
        footer: blobData.footer || { company: '', copyright: '' },
        factory: blobData.factory || { title: '', subtitle: '', description: '', info: {}, process: [] },
        products: blobData.products || [],
        blog: blobData.blog || [],
        _source: 'vercel-blob',
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
