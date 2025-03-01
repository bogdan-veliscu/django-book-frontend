/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["api.dicebear.com", "brandfocus.ai"],
  },
  trailingSlash: true,
  eslint: {
    // Consider removing this in the future to catch issues
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Consider removing this in the future to catch issues
    ignoreBuildErrors: process.env.NODE_ENV === "production",
  },
  logging: {
    level: "error",
  },
  async rewrites() {
    // Use environment variables for API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://app:8000/api";

    console.log("Next.js API URL for rewrites:", apiUrl);

    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
  experimental: {
    outputFileTracingExcludes: {
      "*": ["node_modules/**/@auth/core/**"],
    },
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";

    // Define different CSP policies for dev and production
    const devCSP =
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; connect-src 'self' http://localhost:* http://127.0.0.1:* http://app:8000 ws: wss:; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http:; font-src 'self' data:; frame-ancestors 'none'; form-action 'self';";

    const prodCSP =
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://brandfocus.ai wss://brandfocus.ai https://api.dicebear.com http://localhost:* http://127.0.0.1:* https://brandfocus.ai/api; font-src 'self' data:; img-src 'self' data: https://api.dicebear.com https://brandfocus.ai; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'; form-action 'self';";

    return [
      {
        source: "/:path*",
        headers: [
          // CORS headers - handle properly without wildcards (which can't be used with credentials)
          {
            key: "Access-Control-Allow-Origin",
            value: isDev ? "http://localhost:3000" : "https://brandfocus.ai",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
          // Security headers with environment-appropriate CSP
          {
            key: "Content-Security-Policy",
            value: isDev ? devCSP : prodCSP,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
