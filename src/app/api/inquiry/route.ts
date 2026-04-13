import { NextRequest, NextResponse } from "next/server";

// Mock data storage (replace with database in production)
const inquiries: Array<{
  id: string;
  name: string;
  email: string;
  company?: string;
  country: string;
  product: string;
  message: string;
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, country, product, message } = body;

    // Validation
    if (!name || !email || !country || !product || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create inquiry record
    const inquiry = {
      id: `INQ-${Date.now()}`,
      name,
      email,
      company: company || "",
      country,
      product,
      message,
      createdAt: new Date().toISOString(),
    };

    inquiries.push(inquiry);

    // TODO: Integrate WeChat notification here
    // Option 1: WeChat Work (企业微信) webhook
    // Option 2: WeChat Mini Program
    // Option 3: Third-party service like PushPlus or Server酱
    
    // For now, log to console (replace with actual WeChat notification)
    console.log("🆕 New Inquiry Received:", {
      id: inquiry.id,
      name: inquiry.name,
      email: inquiry.email,
      company: inquiry.company,
      country: inquiry.country,
      product: inquiry.product,
      message: inquiry.message,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      id: inquiry.id,
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ inquiries });
}
