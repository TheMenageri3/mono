import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        //gang remove this after choosing the style later on
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
      },
      {
        protocol: "https",
        hostname: "img.seadn.io",
      },
      {
        protocol: "https",
        hostname: "basc.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "metadata.y00ts.com",
      },
    ],
  },
};

export default nextConfig;
