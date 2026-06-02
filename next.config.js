const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/app/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
