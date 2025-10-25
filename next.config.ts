import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
        child_process: false,
        module: false,
        os: false,
      };
    }
    return config;
  },
  // Disable static generation for auth pages
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;
