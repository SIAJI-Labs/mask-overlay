/**
 * Generate precache manifest entries for Next.js pages
 * This handles both HTML files and JSON data files for static pages
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Define which pages to precache
 * Customize this array based on your app's pages
 */
const PAGES_TO_PRECACHE = [
  {
    route: '/',
    precacheHtml: true, // Home page HTML (always precached by next-pwa)
    precacheJson: false, // No JSON for home page without getStaticProps
  },
  {
    route: '/app',
    precacheHtml: true, // Main app page
    precacheJson: false,
  },
];

/**
 * Generate a manifest entry for a JSON file
 * JSON files are served at /_next/data/{buildId}/{route}.json
 */
function getJSONEntry(route, buildId) {
  const routePath = route === '/' ? '/index' : route;
  return {
    url: `/_next/data/${buildId}${routePath}.json`,
    revision: null, // revision is null when buildId is in the URL
  };
}

/**
 * Generate a manifest entry for an HTML file
 * HTML files are served at the route path
 */
function getHTMLEntry(route, buildId) {
  return {
    url: route,
    revision: buildId, // Use buildId as revision for HTML files
  };
}

/**
 * Generate revision hash for static files in public directory
 */
function generateRevision(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Get all static files from public directory
 * This replicates next-pwa's default behavior for public files
 */
function getStaticPrecacheEntries() {
  const publicDir = path.join(process.cwd(), 'public');

  if (!fs.existsSync(publicDir)) {
    return [];
  }

  const entries = [];

  function scanDirectory(dirPath, urlPath = '/') {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath, path.posix.join(urlPath, file));
      } else {
        // Skip service worker files
        if (file === 'sw.js' || file.startsWith('workbox-')) {
          continue;
        }

        const url = path.posix.join(urlPath, file);
        const revision = generateRevision(fullPath);

        entries.push({ url, revision });
      }
    }
  }

  scanDirectory(publicDir);
  return entries;
}

/**
 * Generate all precache entries for pages
 */
function getPagePrecacheEntries(buildId) {
  const entries = [];

  for (const page of PAGES_TO_PRECACHE) {
    if (page.precacheHtml) {
      entries.push(getHTMLEntry(page.route, buildId));
    }
    if (page.precacheJson) {
      entries.push(getJSONEntry(page.route, buildId));
    }
  }

  return entries;
}

/**
 * Generate complete precache manifest
 */
function getPrecacheManifest(buildId) {
  return [
    ...getStaticPrecacheEntries(),
    ...getPagePrecacheEntries(buildId),
  ];
}

module.exports = {
  getPrecacheManifest,
  getStaticPrecacheEntries,
  getPagePrecacheEntries,
};
