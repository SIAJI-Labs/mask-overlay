---
description: Create a pull request
---

# Creating a Pull Request

This workflow guides you through creating a pull request that follows project standards.

## Prerequisites

1. Your changes are committed using Conventional Commits
2. You have tested your changes locally
3. Your branch is up to date with the main branch

## Conventional Commits Reminder

All commits MUST follow the Conventional Commits format:

```bash
<type>(<scope>): <subject>

# Examples:
git commit -m "feat(upload): add drag-and-drop support"
git commit -m "fix(overlay): correct text positioning"
git commit -m "docs: update contributing guidelines"
```

See [commit workflow](./commit.md) for details.

## Steps to Create a PR

1. **Ensure your branch is up to date:**
```bash
git fetch origin
git rebase origin/main
```

2. **Push your branch to your fork:**
```bash
git push origin your-branch-name
```

3. **Create the PR on GitHub:**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

## PR Template Sections

The PR template includes the following sections (all are required):

### 1. Description
Clear explanation of what the PR does

### 2. Type of Change
Select the appropriate type(s):
- 🚀 feat, 🐛 fix, 📝 docs, 💎 style, ♻️ refactor, etc.

### 3. Related Issues
Link to related issues using `Closes #123` or `Fixes #456`

### 4. Changes Made
Bulleted list of main changes

### 5. Screenshots/Videos
For UI changes, include visual proof

### 6. Testing
- Test cases checklist
- Manual testing steps

### 7. Checklist
Ensure all items are checked:
- [ ] Follows contributing guidelines
- [ ] Uses Conventional Commits
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No new warnings/errors
- [ ] Tested locally
- [ ] Accessibility checked
- [ ] Uses shadcn/ui components
- [ ] Uses cn() utility

### 8. Breaking Changes
If applicable, describe breaking changes

### 9. Additional Notes
Any extra context for reviewers

## Example PR Title

PR titles should also follow Conventional Commits format:

```
feat(upload): add drag-and-drop file upload support
fix(overlay): correct text positioning on rotated images
docs: update README with new features
```

## Common Mistakes to Avoid

❌ **Don't:**
- Skip the PR template
- Use vague descriptions
- Forget to link related issues
- Skip testing
- Ignore linting errors
- Make commits that don't follow Conventional Commits

✅ **Do:**
- Fill out all template sections
- Be specific and clear
- Link all related issues
- Test thoroughly
- Fix all linting errors
- Use proper commit message format

## Review Process

1. **Submit PR**: Complete the template and submit
2. **CI Checks**: Wait for automated checks to pass
3. **Review**: Maintainers will review your PR
4. **Address Feedback**: Make requested changes
5. **Approval**: Once approved, your PR will be merged

## After Submission

- Respond promptly to reviewer feedback
- Make requested changes in new commits
- Keep your branch updated with main if needed
- Be patient and respectful

## Resources

- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Full contributing guidelines
- [commit.md](./commit.md) - Commit message guidelines
- [Conventional Commits](https://www.conventionalcommits.org/) - Specification

## Notes

- PRs that don't follow the template may be rejected
- All commits must follow Conventional Commits
- Be thorough in testing before submitting
- Screenshots are required for UI changes
