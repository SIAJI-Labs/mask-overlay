# Deployment Automation Guide

This project uses GitHub Actions for automated deployment to production. The workflow follows semantic versioning and ensures safe, traceable deployments.

## 🔄 Deployment Flow

```
1. Create Tag          → 2. Create Release    → 3. Build Site        → 4. Create PR to release
   (npm run tag:create)    (GitHub Release)       (Static export)        (Auto-created)
                                                                                ↓
                                                                        5. Merge PR → 6. Deploy
                                                                           (Manual)     (Auto)
```

## 📋 Prerequisites

### Required GitHub Secrets

Add these secrets in **Settings → Secrets and variables → Actions**:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SSH_HOST` | Production server hostname | `siaji.com` |
| `SSH_USERNAME` | SSH username | `deploy` |
| `SSH_PRIVATE_KEY` | SSH private key for authentication | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SSH_PORT` | SSH port (default: 22) | `22` |
| `ENV_SITE_ROOT_PATH` | Deployment directory on server | `/var/www/markly` |

### Server Requirements

Your production server should have:
- SSH access configured
- Directory structure:
  ```
  /var/www/markly/
  ├── public/          # Current deployment
  └── backups/         # Automatic backups (latest 5 kept)
  ```

## 🚀 Creating a Release

### Option 1: Interactive Script (Recommended)

```bash
# Test without making changes
npm run tag:dry-run

# Create and push a new tag
npm run tag:create
```

The script will:
1. Switch to `develop` branch
2. Fetch latest tags
3. Show current version
4. Let you choose: **major**, **minor**, or **patch**
5. Create and push the tag
6. Return to your original branch

### Option 2: Manual Tag

```bash
# From develop branch
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin v0.2.0
```

## 🔧 Workflow Details

### 1. Release Workflow (`release.yml`)

**Trigger**: Push tag matching `v*` (e.g., `v0.2.0`)

**Actions**:
- Generates changelog from commits
- Creates GitHub Release
- Attaches release notes

**Output**: GitHub Release with auto-generated changelog

---

### 2. Create Release PR & Build (`create-release-pr.yml`)

**Trigger**: After `release.yml` completes

**Actions**:
1. **Extract Release Info**: Gets version from tag
2. **Build Static Site**:
   - Runs `npm ci` and `npm run build`
   - Exports Next.js static files
   - Creates `deployment-info.json`
   - Packages as `markly-site-v0.2.0.tar.gz`
   - Uploads to GitHub Release
3. **Create Release PR**:
   - Closes any existing release PRs
   - Creates new PR: `develop` → `release`
   - Includes deployment checklist
   - Auto-assigns reviewer

**Outputs**:
- Site archive attached to release
- Pull Request to `release` branch

---

### 3. Deploy Site (`deploy-site.yml`)

**Trigger**: When PR to `release` is merged

**Actions**:
1. Downloads site archive from GitHub Release
2. SSHs to production server
3. Backs up current deployment
4. Extracts new site to `public/`
5. Sets proper permissions
6. Cleans up old backups (keeps latest 5)
7. Auto-rollback on failure

**Safety Features**:
- ✅ Automatic backups before deployment
- ✅ Rollback on extraction failure
- ✅ Permission validation
- ✅ Keeps 5 historical backups

---

## 📝 Step-by-Step Release Process

### 1. **Prepare Release**
```bash
# Make sure you're on develop
git checkout develop
git pull origin develop

# Run checks
npm run lint
npm run typecheck
npm run test
npm run build
```

### 2. **Create Tag**
```bash
npm run tag:create
```

Follow the interactive prompts to select version bump type.

### 3. **Wait for Automation**
- ✅ GitHub Release created (~1 min)
- ✅ Site built and packaged (~2-3 min)
- ✅ PR created to `release` branch (~30 sec)

### 4. **Review Release PR**

Check the auto-created PR for:
- [ ] Changelog looks correct
- [ ] Build artifacts are attached
- [ ] All tests passed
- [ ] No breaking changes

### 5. **Merge to Deploy**
```bash
# Review and merge the PR
gh pr review <PR_NUMBER> --approve
gh pr merge <PR_NUMBER> --merge
```

### 6. **Monitor Deployment**
- Go to **Actions** tab
- Watch `Deploy Site` workflow
- Verify success in workflow summary

---

## 🛠️ Manual Deployment (Emergency)

If you need to deploy manually:

```bash
# Trigger deploy workflow manually
gh workflow run deploy-site.yml -f tag=v0.2.0
```

Or download and deploy directly:

```bash
# Download from release
wget https://github.com/SIAJI-Labs/mask-overlay/releases/download/v0.2.0/markly-site-v0.2.0.tar.gz

# Deploy to server
scp markly-site-v0.2.0.tar.gz user@siaji.com:/tmp/
ssh user@siaji.com "cd /var/www/markly && tar -xzf /tmp/markly-site-v0.2.0.tar.gz"
```

---

## 🔍 Troubleshooting

### Build Fails
- Check `npm run build` works locally
- Verify all dependencies are in `package.json`
- Check Node.js version (workflow uses v20)

### PR Not Created
- Ensure `release` branch exists
- Check workflow run logs in Actions tab
- Verify `GITHUB_TOKEN` has correct permissions

### Deployment Fails
- Verify SSH secrets are correct
- Check server disk space: `df -h`
- Check server permissions on target directory
- Review deployment logs in Actions

### Rollback
If deployment is broken:

```bash
# SSH to server
ssh user@siaji.com

# List backups
ls -lt /var/www/markly/backups/

# Restore from backup
cd /var/www/markly
rm -rf public
cp -r backups/backup_20241229_120000 public
```

---

## 📊 Monitoring

After deployment, verify:

1. **Site is live**: https://markly.siaji.com
2. **Version is correct**: Check `/deployment-info.json`
3. **No console errors**: Open browser DevTools
4. **PWA works**: Test offline mode

---

## 🎯 Best Practices

1. **Always test locally first**
   ```bash
   npm run lint && npm run typecheck && npm run test && npm run build
   ```

2. **Use semantic versioning**
   - `major` (v1.0.0): Breaking changes
   - `minor` (v0.2.0): New features
   - `patch` (v0.1.1): Bug fixes

3. **Keep `develop` stable**
   - Only merge tested, working code
   - Run CI checks before creating tags

4. **Review before merging**
   - Check the auto-generated PR thoroughly
   - Verify build artifacts are attached

5. **Monitor after deployment**
   - Check site immediately after merge
   - Test critical user flows

---

## 🚨 Emergency Contacts

If deployment breaks production:

1. **Immediate rollback**: Use backup from server
2. **Fix forward**: Create hotfix tag (patch version)
3. **Notify**: Contact repository owner

---

## 📚 Related Documentation

- [Contributing Guidelines](../CONTRIBUTING.md)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
