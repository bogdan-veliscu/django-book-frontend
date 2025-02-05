/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "production",
  },
  logging: {
    level: "error",
    quiet: true,
  },
  auth: {
    trustHost: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
        }/:path*`,
      },
    ];
  },
  experimental: {
    outputFileTracingExcludes: {
      "*": ["node_modules/**/@auth/core/**"],
    },
  },
};

module.exports = nextConfig;
