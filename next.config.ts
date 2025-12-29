import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // Fix for static export - exclude build manifests and runtime files
  buildExcludes: [/middleware-manifest\.json$/, /middleware-runtime\.js$/, /_buildManifest\.js$/, /_ssgManifest\.js$/],
  // Don't try to precache files that don't exist in static export
  publicExcludes: ['!noprecache/**/*'],
});

const nextConfig: NextConfig = {
  // Allow next-pwa webpack config with Turbopack
  turbopack: {},
  // Static export configuration for fully static site
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default withPWA(nextConfig);
