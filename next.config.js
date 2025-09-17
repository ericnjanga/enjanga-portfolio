/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,

  // ⬇️ let Next process JS + CSS coming from the library
  transpilePackages: ['enjanga-components-library'],
};

module.exports = nextConfig;
