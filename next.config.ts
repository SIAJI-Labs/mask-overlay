import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

// Use config function to only run build-specific code during build phase
export default function (phase: string) {
  // Only generate build ID and precache manifest during production build
  const PHASE_PRODUCTION_BUILD = 'phase-production-build';

  let buildId: string;
  let additionalManifestEntries: any[] = [];

  if (phase === PHASE_PRODUCTION_BUILD) {
    const { getBuildId } = require('./scripts/build-id');
    const { getPrecacheManifest } = require('./scripts/precache-manifest');

    // Generate build ID for this build
    buildId = getBuildId();

    // Generate precache manifest entries
    additionalManifestEntries = getPrecacheManifest(buildId);

    console.log(`🔧 Build ID: ${buildId}`);
    console.log(`📦 Precaching ${additionalManifestEntries.length} entries`);
  } else {
    buildId = process.env.NEXT_PUBLIC_VERSION || `dev-${Date.now()}`;
  }

  const withPWA = withPWAInit({
    dest: "public",
    register: false, // We handle registration manually in ServiceWorkerProvider
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    // @ts-ignore - additionalManifestEntries is not in the type definition but is supported
    additionalManifestEntries: phase === PHASE_PRODUCTION_BUILD ? additionalManifestEntries : undefined,
    // Fix for static export - exclude build manifests and SSG manifests from precaching
    // These files don't exist in static export and cause 404 errors
    buildExcludes: [
      /middleware-manifest\.json$/,
      /middleware-runtime\.js$/,
      /_buildManifest\.js$/,
      /_ssgManifest\.js$/,
      // Also exclude the entire _next/static/{buildId} directory pattern
      /\/static\/[^\/]+\/_buildManifest\.js$/,
      /\/static\/[^\/]+\/_ssgManifest\.js$/,
    ],
  });

  const nextConfig: NextConfig = {
    // Use custom build ID
    generateBuildId: async () => buildId,
    // Static export configuration for fully static site
    output: 'export',
    // Disable image optimization for static export
    images: {
      unoptimized: true,
    },
  };

  return withPWA(nextConfig);
}
