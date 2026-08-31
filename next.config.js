/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  // ⬇️ let Next process JS + CSS coming from the library
  transpilePackages: ['enjanga-components-library'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
};

module.exports = nextConfig;
