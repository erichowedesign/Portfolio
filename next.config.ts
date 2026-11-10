import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phone on the same Wi-Fi loads the dev server by LAN address.
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.4.42"],
  async rewrites() {
    return [{ source: "/gta6", destination: "/gta6/index.html" }];
  },
};

export default nextConfig;
