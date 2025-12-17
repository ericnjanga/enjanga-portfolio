/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  output: 'export',
  trailingSlash: true,

  // ⬇️ let Next process JS + CSS coming from the library
  transpilePackages: ['enjanga-components-library'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
