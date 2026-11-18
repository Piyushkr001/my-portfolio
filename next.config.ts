import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Allow DNS64/NAT64 (64:ff9b::/96) upstream resolutions for the explicit remotePatterns allowlist.
    dangerouslyAllowLocalIP: true,
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
      {
        hostname:"image.thum.io",
        protocol:"https"
      },
    ]
  }
};

export default nextConfig;
