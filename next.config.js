/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      "prisma",
      "@prisma/client",
      "next-auth/client",
    ],
  },
};

module.exports = nextConfig;
