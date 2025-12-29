#!/usr/bin/env node

/**
 * Interactive tag creator for mask-overlay
 * Adapted from SIAJI-Labs/chauffeur tag-creator.go
 *
 * Usage:
 *   node scripts/tag-generate.js [--dry-run]
 */

const { execSync } = require('child_process');
const readline = require('readline');

const DRY_RUN = process.argv.includes('--dry-run');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options
    });
    return options.silent ? result.trim() : '';
  } catch (error) {
    if (options.ignoreError) return '';
    throw error;
  }
}

function getCurrentBranch() {
  return exec('git rev-parse --abbrev-ref HEAD', { silent: true });
}

function getLatestTag() {
  const tag = exec('git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0"', {
    silent: true,
    ignoreError: true
  });
  return tag || 'v0.0.0';
}

function hasUncommittedChanges() {
  const status = exec('git status --porcelain', { silent: true });
  return status.length > 0;
}

function parseVersion(version) {
  const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return null;
  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3]),
  };
}

function incrementVersion(version, type) {
  const parsed = parseVersion(version);
  if (!parsed) throw new Error(`Invalid version format: ${version}`);

  switch (type) {
    case 'major':
      return `v${parsed.major + 1}.0.0`;
    case 'minor':
      return `v${parsed.major}.${parsed.minor + 1}.0`;
    case 'patch':
      return `v${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
    default:
      throw new Error(`Invalid bump type: ${type}`);
  }
}

async function prompt(question, choices) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    console.log(`\n${colors.cyan}${question}${colors.reset}`);
    choices.forEach((choice, idx) => {
      console.log(`  ${colors.bright}${idx + 1}${colors.reset}. ${choice.label}`);
    });

    rl.question(`\n${colors.yellow}Enter choice (1-${choices.length}):${colors.reset} `, (answer) => {
      rl.close();
      const idx = parseInt(answer) - 1;
      if (idx >= 0 && idx < choices.length) {
        resolve(choices[idx].value);
      } else {
        log('Invalid choice, exiting.', colors.red);
        process.exit(1);
      }
    });
  });
}

async function main() {
  log('\n=== Mask Overlay Tag Creator ===\n', colors.bright + colors.cyan);

  if (DRY_RUN) {
    log('[DRY RUN MODE - No changes will be made]\n', colors.yellow);
  }

  // Store original branch
  const originalBranch = getCurrentBranch();
  log(`Current branch: ${originalBranch}`, colors.blue);

  try {
    // Check for uncommitted changes
    if (hasUncommittedChanges()) {
      log('\n❌ You have uncommitted changes. Please commit or stash them first.', colors.red);
      process.exit(1);
    }

    // Switch to develop branch
    log('\n📌 Switching to develop branch...', colors.blue);
    if (!DRY_RUN) {
      exec('git checkout develop');
    }

    // Fetch latest tags
    log('🔄 Fetching latest tags from remote...', colors.blue);
    if (!DRY_RUN) {
      exec('git fetch --tags');
    }

    // Get current version
    const currentVersion = getLatestTag();
    log(`\n📋 Current version: ${currentVersion}`, colors.green);

    // Calculate version options
    const choices = [
      { label: `Major (${incrementVersion(currentVersion, 'major')}) - Breaking changes`, value: 'major' },
      { label: `Minor (${incrementVersion(currentVersion, 'minor')}) - New features`, value: 'minor' },
      { label: `Patch (${incrementVersion(currentVersion, 'patch')}) - Bug fixes`, value: 'patch' },
    ];

    // Prompt for version bump type
    const bumpType = await prompt('Select version bump type:', choices);
    const newVersion = incrementVersion(currentVersion, bumpType);

    log(`\n✨ New version will be: ${newVersion}`, colors.green + colors.bright);

    // Confirm
    const confirm = await prompt('Proceed with tag creation?', [
      { label: 'Yes, create and push tag', value: true },
      { label: 'No, cancel', value: false },
    ]);

    if (!confirm) {
      log('\n❌ Tag creation cancelled.', colors.yellow);
      return;
    }

    // Create tag
    log(`\n🏷️  Creating tag ${newVersion}...`, colors.blue);
    if (!DRY_RUN) {
      exec(`git tag -a ${newVersion} -m "Release ${newVersion}"`);
      log('✅ Tag created locally', colors.green);

      // Push tag
      log('📤 Pushing tag to remote...', colors.blue);
      exec(`git push origin ${newVersion}`);
      log('✅ Tag pushed to remote', colors.green);
    } else {
      log(`[DRY RUN] Would create tag: ${newVersion}`, colors.yellow);
      log(`[DRY RUN] Would push tag to remote`, colors.yellow);
    }

    log(`\n🎉 Successfully created and pushed tag ${newVersion}!`, colors.green + colors.bright);
    log(`\n📝 GitHub Actions will now:`, colors.cyan);
    log(`   1. Create a GitHub release with changelog`, colors.cyan);
    log(`   2. Build the static site`, colors.cyan);
    log(`   3. Create a PR to release branch`, colors.cyan);
    log(`   4. Deploy to production (after PR merge)\n`, colors.cyan);

  } catch (error) {
    log(`\n❌ Error: ${error.message}`, colors.red);
    process.exit(1);
  } finally {
    // Return to original branch
    if (!DRY_RUN && getCurrentBranch() !== originalBranch) {
      log(`\n🔙 Returning to ${originalBranch}...`, colors.blue);
      exec(`git checkout ${originalBranch}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
