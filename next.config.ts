import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "awsbuckettestforclient.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "automotivesuperstore.com.au",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "kayhanaudio.com.au",
      },
      {
        protocol: "https",
        hostname: "d198m4c88a0fux.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
