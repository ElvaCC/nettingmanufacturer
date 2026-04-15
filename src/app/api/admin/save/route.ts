import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const content = await request.json();
    
    // Write to content.json
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, message: 'Content saved successfully' });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save content' },
      { status: 500 }
    );
  }
}
