import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "media.graphassets.com",
        protocol: "https"
      }
    ]
  }
};

export default nextConfig;
