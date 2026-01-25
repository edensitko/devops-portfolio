import type { NextConfig } from "next";

const isExport = process.env.NEXT_PUBLIC_OUTPUT === 'export';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: isExport ? 'export' : 'standalone',
  images: {
    unoptimized: isExport,
  },
};

export default nextConfig;
