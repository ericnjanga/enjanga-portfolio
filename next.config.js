/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,

  // ⬇️ let Next process JS + CSS coming from the library
  transpilePackages: ['enjanga-next-3-components-lib'],
};

module.exports = nextConfig;
