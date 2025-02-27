/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    domains: ["api.dicebear.com", "brandfocus.ai", "localhost", ""],
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
