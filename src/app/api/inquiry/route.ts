import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Inquiry submission endpoint.
//
// Security & privacy principles:
//   - Credentials (SMTP_*, FEISHU_WEBHOOK_URL) live ONLY in environment
//     variables. They are never hardcoded, never returned, never logged.
//   - We never write the full customer inquiry content into console logs.
//     Only a short, non-PII summary is logged.
//   - We never claim success unless a real delivery channel actually
//     accepted the message. If no channel is configured, the request is
//     refused with an explicit error (so the UI shows an honest failure).
// ---------------------------------------------------------------------------

const MAX_FIELD_LENGTHS: Record<string, number> = {
  name: 100,
  email: 254,
  company: 150,
  phone: 40,
  country: 100,
  product: 150,
  message: 5000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

interface InquiryPayload {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  product: string;
  message: string;
}

function validate(body: Record<string, unknown>): { ok: true; data: InquiryPayload } | { ok: false; error: string } {
  const data: InquiryPayload = {
    name: sanitize(body.name, MAX_FIELD_LENGTHS.name),
    email: sanitize(body.email, MAX_FIELD_LENGTHS.email),
    company: sanitize(body.company, MAX_FIELD_LENGTHS.company),
    phone: sanitize(body.phone, MAX_FIELD_LENGTHS.phone),
    country: sanitize(body.country, MAX_FIELD_LENGTHS.country),
    product: sanitize(body.product, MAX_FIELD_LENGTHS.product),
    message: sanitize(body.message, MAX_FIELD_LENGTHS.message),
  };

  if (!data.name) return { ok: false, error: "Name is required." };
  if (!data.email || !EMAIL_RE.test(data.email)) return { ok: false, error: "A valid email is required." };
  if (!data.message) return { ok: false, error: "Message is required." };
  // `product` is optional: generic contact forms do not collect it.

  // Lightweight spam guard: honeypot field must stay empty.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return { ok: false, error: "Invalid submission." };
  }

  return { ok: true, data };
}

// ---------------------------------------------------------------------------
// Delivery channel: SMTP email (preferred) + optional Feishu webhook fallback.
// ---------------------------------------------------------------------------

async function sendEmail(data: InquiryPayload): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, INQUIRY_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !INQUIRY_TO_EMAIL) {
    return false; // Not configured.
  }

  try {
    // Lazy-require nodemailer so the build does not fail if it is absent.
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 465),
      secure: Number(SMTP_PORT || 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = data.product ? `New Inquiry: ${data.product}` : "New Inquiry (Website Contact Form)";
    const html = `
      <h2 style="margin:0 0 8px">New B2B Inquiry</h2>
      <table style="border-collapse:collapse;font-size:14px;font-family:Arial,sans-serif">
        <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Company</td><td>${escapeHtml(data.company || "N/A")}</td></tr>
        ${data.phone ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${escapeHtml(data.phone)}</td></tr>` : ""}
        ${data.country ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Country</td><td>${escapeHtml(data.country)}</td></tr>` : ""}
        ${data.product ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Product</td><td>${escapeHtml(data.product)}</td></tr>` : ""}
      </table>
      <p style="margin:16px 0 4px;color:#666">Message</p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
      <p style="color:#999;font-size:12px;margin-top:16px">Submitted at ${new Date().toISOString()}</p>
    `;

    await transporter.sendMail({
      from: SMTP_USER,
      to: INQUIRY_TO_EMAIL,
      subject,
      html,
    });
    return true;
  } catch {
    return false;
  }
}

async function sendFeishu(data: InquiryPayload): Promise<boolean> {
  const url = process.env.FEISHU_WEBHOOK_URL;
  if (!url) return false;

  try {
    const content = [
      `New B2B Inquiry`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company || "N/A"}`,
      `Country: ${data.country || "N/A"}`,
      ...(data.product ? [`Product: ${data.product}`] : []),
      `Message: ${data.message}`,
    ].join("\n");

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg_type: "text", content: { text: content } }),
    });
    if (!res.ok) return false;
    const json = await res.json().catch(() => null);
    // Feishu returns { code: 0 } on success.
    return !json || json.code === 0;
  } catch {
    return false;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const data = result.data;

  const emailSent = await sendEmail(data);
  const feishuSent = await sendFeishu(data);

  // Non-PII summary log only.
  console.log(
    `[inquiry] product=${data.product || "N/A"} country=${data.country || "N/A"} email=${data.email ? "yes" : "no"} emailSent=${emailSent} feishuSent=${feishuSent}`
  );

  if (emailSent || feishuSent) {
    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      id: `INQ-${Date.now()}`,
    });
  }

  // No delivery channel configured or all failed — be honest.
  return NextResponse.json(
    { error: "Inquiry system is not configured. Please contact us by email directly." },
    { status: 503 }
  );
}
