import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/lingoace", destination: "/teacher-ops", permanent: true },
      { source: "/lingoace/calculator", destination: "/teacher-ops/calculator", permanent: true },
      { source: "/lingoace/:path*", destination: "/teacher-ops/:path*", permanent: true },
      { source: "/mock-interview", destination: "/teacher-ops", permanent: true },
      { source: "/mock-interview/:path*", destination: "/teacher-ops", permanent: true },
    ];
  },
};

export default nextConfig;
