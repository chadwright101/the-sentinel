import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
      {
        protocol: "https",
        hostname: "sentinelnewscomau.wpcomstaging.com",
      },
      {
        protocol: "https",
        hostname: "i.calameoassets.com",
      },
    ],
  },
};

export default nextConfig;
