// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/yeeldbox": { page: "/yeeldbox" },
      "/docs": { page: "/docs" },
    };
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};
