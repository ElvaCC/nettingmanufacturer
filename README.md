# Netting Manufacturer Website

A professional B2B website for HDPE netting products, optimized for Google SEO and international markets.

## 🌐 Features

- **Multi-language Support**: English, Spanish, Russian, Arabic (RTL)
- **Google SEO Optimized**: Schema.org structured data, sitemap, robots.txt
- **Mobile-First Design**: Responsive, fast-loading pages
- **E-E-A-T Optimized**: Professional design to build trust
- **Inquiry System**: Multi-language forms with WeChat notification

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Icons**: Lucide React

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── [locale]/          # i18n routing
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── products/      # Products
│   │   │   ├── about/         # About Us
│   │   │   ├── cases/         # Case Studies
│   │   │   └── contact/       # Contact
│   │   ├── api/               # API routes
│   │   ├── messages/          # Translation files
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── home/              # Homepage sections
│   │   ├── products/          # Product components
│   │   └── forms/             # Form components
│   └── lib/
│       ├── seo/               # SEO utilities
│       └── wechat-notification.ts
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# WeChat Work Webhook (optional)
WECHAT_WEBHOOK_URL=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx

# ServerChan (alternative WeChat push)
SERVERCHAN_KEY=xxx
```

### Domain Setup

When deploying to production:

1. Configure DNS:
   - A record: `@` → Vercel IP
   - CNAME: `www` → cname.vercel-dns.com

2. Update `next.config.js`:
   ```js
   images: {
     domains: ['your-domain.com'],
   }
   ```

## 📊 SEO Checklist

- [x] XML Sitemap
- [x] robots.txt
- [x] Schema.org (Organization, Product, Website)
- [x] hreflang tags for multi-language
- [x] Open Graph & Twitter Cards
- [x] Mobile-first responsive design
- [x] Core Web Vitals optimized

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

Build command: `npm run build`
Output directory: `.next`

## 📝 Content Notes

The website is currently set up with placeholder content. You need to:

1. Add your actual product images to `/public/images/`
2. Update company information in `/src/app/messages/*.json`
3. Configure WeChat notification in `.env.local`
4. Add Google Analytics / Search Console verification

## 🔒 Security

- Form submissions are validated server-side
- API routes protected against CSRF
- No sensitive data in client-side code

## 📄 License

Proprietary - All rights reserved
