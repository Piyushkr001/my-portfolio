import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https"
      },
      {
        hostname:"media.graphassets.com",
        protocol:"https"
      },
      {
        hostname:"play-lh.googleusercontent.com",
        protocol:"https"
      },
      {
        hostname:"i.ytimg.com",
        protocol:"https"
      },
      {
        hostname:"www.talentlms.com",
        protocol:"https"
      },
    ]
  }
};

export default nextConfig;
