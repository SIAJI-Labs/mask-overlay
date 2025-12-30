/**
 * Build ID generator for Next.js builds
 * Uses nanoid to generate unique, URL-safe build identifiers
 */

const { nanoid } = require('nanoid');

let cachedBuildId = null;

/**
 * Generate or retrieve a build ID
 * The ID is cached to ensure consistency across multiple calls during the same build
 */
function getBuildId() {
  if (!cachedBuildId) {
    cachedBuildId = nanoid();
  }
  return cachedBuildId;
}

module.exports = { getBuildId };
