import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
};

export default nextConfig;
