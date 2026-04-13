// WeChat Notification Service
// This module handles sending inquiry notifications to WeChat

interface InquiryData {
  name: string;
  email: string;
  company?: string;
  country: string;
  product: string;
  message: string;
}

// WeChat Work webhook URL (configurable via environment variable)
const WECHAT_WEBHOOK_URL = process.env.WECHAT_WEBHOOK_URL || "";

// ServerChan / PushPlus token (alternative to WeChat)
const SERVERCHAN_KEY = process.env.SERVERCHAN_KEY || "";

export async function sendWeChatNotification(inquiry: InquiryData): Promise<boolean> {
  const message = formatInquiryMessage(inquiry);

  // Try WeChat Work webhook first
  if (WECHAT_WEBHOOK_URL) {
    try {
      const response = await fetch(WECHAT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msgtype: "markdown",
          markdown: {
            content: message,
          },
        }),
      });

      if (response.ok) {
        console.log("✅ WeChat notification sent successfully");
        return true;
      }
    } catch (error) {
      console.error("❌ Failed to send WeChat notification:", error);
    }
  }

  // Fallback to ServerChan (push to WeChat via email)
  if (SERVERCHAN_KEY) {
    return await sendViaServerChan(message);
  }

  // If no notification service configured, log to console
  console.log("📱 New Inquiry (no WeChat integration configured):", inquiry);
  return true;
}

function formatInquiryMessage(inquiry: InquiryData): string {
  return `
🆕 **New B2B Inquiry**

👤 **Name:** ${inquiry.name}
📧 **Email:** ${inquiry.email}
🏢 **Company:** ${inquiry.company || "N/A"}
🌍 **Country:** ${inquiry.country}

📦 **Product Interest:** ${inquiry.product}

💬 **Message:**
${inquiry.message}

---
⏰ ${new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}
  `.trim();
}

async function sendViaServerChan(message: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://sctapi.ftqq.com/${SERVERCHAN_KEY}.send`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "🆕 New B2B Inquiry from Website",
          desp: message,
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Failed to send ServerChan notification:", error);
    return false;
  }
}
