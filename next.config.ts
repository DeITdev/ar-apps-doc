import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty turbopack config to allow Turbopack to run alongside webpack config
  turbopack: {},
  webpack: (config) => {
    // Fix shiki .mjs resolution - webpack needs to be told
    // to fully resolve .mjs files within node_modules
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    return config;
  },
};

export default nextConfig;
