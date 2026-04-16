import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Flatten for admin form
    const flat = {
      hero: data.hero || { title: '', subtitle: '', cta1: '', cta2: '' },
      about: data.about ? {
        ...data.about,
        features: Array.isArray(data.about.features) ? data.about.features.join(', ') : ''
      } : { title: '', subtitle: '', description: '', features: '' },
      contact: data.contact || { email: '', phone: '', whatsapp: '', address: '', workingHours: '' },
      footer: data.footer || { company: '', copyright: '' },
    };
    
    return NextResponse.json(flat);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
