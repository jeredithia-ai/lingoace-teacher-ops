import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf-parse", "mammoth"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async redirects() {
    return [
      { source: "/lingoace", destination: "/teacher-ops", permanent: true },
      { source: "/lingoace/calculator", destination: "/teacher-ops/calculator", permanent: true },
      { source: "/lingoace/:path*", destination: "/teacher-ops/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
