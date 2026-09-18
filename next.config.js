/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: `/${process.env.CONTENTFUL_SPACE_ID || 'z41mabrhnu57'}/**`,
        search: '',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  // ⬇️ let Next process JS + CSS coming from the library
  transpilePackages: ['enjanga-components-library'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
};

module.exports = nextConfig;
