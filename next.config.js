/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    domains: ["api.dicebear.com"],
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
    url: process.env.NEXTAUTH_URL || "https://brandfocus.ai",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${
          process.env.NEXT_PUBLIC_API_URL || "http://app:8000/api"
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
