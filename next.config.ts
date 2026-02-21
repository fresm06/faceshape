import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 정적 사이트 생성을 위해 추가
  reactStrictMode: true,
  images: {
    unoptimized: true, // 정적 배포 시 필수
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
