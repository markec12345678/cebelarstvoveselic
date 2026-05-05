import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Odstranili smo 'eslint' sekcijo, ki je metala napako
  reactStrictMode: false,
};

export default nextConfig;