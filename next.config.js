const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/app/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 旧的 square-net 地址永久跳转到新名字，避免外链和收藏夹失效
      {
        source: '/:locale(en|es|ru|ar)/products/square-net',
        destination: '/:locale/products/debris-netting',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.nettingmanufacturer.com',
      },
      {
        protocol: 'https',
        hostname: '**.nettingfactory.com',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
