// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  output: 'export',
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};
