#!/usr/bin/env node

/**
 * Post-build script to fix service worker precache manifest for static export
 * Regenerates the precache manifest based on actual files in the out directory
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const OUT_DIR = path.join(process.cwd(), 'out');
const SW_PATH = path.join(OUT_DIR, 'sw.js');

if (!fs.existsSync(OUT_DIR)) {
  console.log('⚠️  out directory not found, skipping service worker fix');
  process.exit(0);
}

if (!fs.existsSync(SW_PATH)) {
  console.log('⚠️  Service worker not found in out directory, skipping fix');
  process.exit(0);
}

/**
 * Generate MD5 hash for file content (for cache busting)
 */
function generateRevision(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

/**
 * Build the precache manifest from actual files in out directory
 */
function buildPrecacheManifest() {
  const allFiles = getAllFiles(OUT_DIR);
  const manifest = [];

  for (const filePath of allFiles) {
    const relativePath = path.relative(OUT_DIR, filePath).replace(/\\/g, '/');

    // Skip the service worker files themselves
    if (relativePath === 'sw.js' || relativePath.includes('workbox-')) {
      continue;
    }

    // Skip .txt files (Next.js metadata)
    if (relativePath.endsWith('.txt')) {
      continue;
    }

    // Skip .map files
    if (relativePath.endsWith('.map')) {
      continue;
    }

    // Skip internal Next.js manifests that cause issues
    if (relativePath.includes('_buildManifest.js') ||
        relativePath.includes('_ssgManifest.js') ||
        relativePath.includes('_clientMiddlewareManifest.json')) {
      continue;
    }

    const url = '/' + relativePath;
    const revision = generateRevision(filePath);

    manifest.push({
      url,
      revision
    });
  }

  return manifest;
}

try {
  console.log('🔧 Rebuilding service worker precache manifest...');

  // Build new manifest from actual files
  const newManifest = buildPrecacheManifest();
  console.log(`📦 Found ${newManifest.length} files to precache`);

  // Read current service worker
  let swContent = fs.readFileSync(SW_PATH, 'utf8');

  // Convert manifest to the format expected by workbox
  const manifestString = JSON.stringify(newManifest);

  // Replace the precache manifest in the service worker
  // The pattern matches: e.precacheAndRoute([...array of objects...], {...options...})
  swContent = swContent.replace(
    /e\.precacheAndRoute\(\[.*?\],\{ignoreURLParametersMatching:\[\]\}\)/s,
    `e.precacheAndRoute(${manifestString},{ignoreURLParametersMatching:[]})`
  );

  // Add message event listener for SKIP_WAITING at the end of the file
  const messageListenerCode = `
// Listen for SKIP_WAITING message from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
`;

  // Append the message listener to the end of the service worker
  swContent = swContent.trim() + '\n' + messageListenerCode;

  // Write the fixed service worker
  fs.writeFileSync(SW_PATH, swContent, 'utf8');

  console.log('✅ Service worker precache manifest rebuilt successfully');
  console.log(`   Total precache entries: ${newManifest.length}`);
  console.log('✅ Added SKIP_WAITING message listener');

  // Show sample entries
  console.log('\n📋 Sample precache entries:');
  newManifest.slice(0, 5).forEach(entry => {
    console.log(`   - ${entry.url} (${entry.revision.substring(0, 8)}...)`);
  });
  if (newManifest.length > 5) {
    console.log(`   ... and ${newManifest.length - 5} more`);
  }

} catch (error) {
  console.error('❌ Error fixing service worker:', error.message);
  process.exit(1);
}
