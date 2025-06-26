import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NEXT_PUBLIC_SERVER_MODE === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/:path*`,
      }
    ]
  }
}
export default withPWA(nextConfig);
