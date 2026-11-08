import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/gta6", destination: "/gta6/index.html" }];
  },
};

export default nextConfig;
