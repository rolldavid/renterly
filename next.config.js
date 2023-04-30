/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      "prisma",
      "@prisma/client",
      "next-auth/client",
      "react-markdown",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "renterlyblog.s3.us-west-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d3h42dhdxazsqn.cloudfront.net",
        port: "",
        pathname: "/*",
      },
    ],
    domains: ["d3h42dhdxazsqn.cloudfront.net"],
  },
};

module.exports = nextConfig;
