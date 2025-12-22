# Contributing to Mask Overlay

Thank you for your interest in contributing to the Mask Overlay project! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository** and clone your fork locally
2. **Install dependencies**: `npm install`
3. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
4. **Make your changes** following our coding standards
5. **Test your changes** locally with `npm run dev`
6. **Commit your changes** following our commit message guidelines
7. **Push to your fork** and submit a pull request

## Commit Message Guidelines

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. This leads to more readable messages that are easy to follow when looking through the project history.

### Commit Message Format

Each commit message consists of a **header**, a **body**, and a **footer**. The header has a special format that includes a **type**, an optional **scope**, and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: npm, webpack, vite)
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Scope

The scope should be the name of the affected component or feature area. Examples:

- `upload` - Image upload functionality
- `overlay` - Text overlay engine
- `ui` - User interface components
- `config` - Configuration files
- `deps` - Dependencies

### Subject

The subject contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end
- Maximum 72 characters

### Body

Just as in the subject, use the imperative, present tense. The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit closes.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

### Examples

#### Example 1: Feature with scope
```
feat(upload): add drag-and-drop file upload

Implement drag-and-drop functionality for image upload component.
Users can now drag images directly onto the upload area instead
of clicking the file input.

Closes #123
```

#### Example 2: Bug fix
```
fix(overlay): correct text positioning on rotated images

The overlay text was not properly positioned when the image
was rotated. Updated the coordinate calculation to account
for rotation transformations.
```

#### Example 3: Documentation
```
docs: add canvas API examples to quick reference

Added code snippets demonstrating how to use the Canvas API
for image manipulation and text overlay rendering.
```

#### Example 4: Breaking change
```
feat(overlay)!: change overlay configuration API

BREAKING CHANGE: The overlay configuration object structure
has changed. The `position` property is now an object with
`x` and `y` coordinates instead of a string value.

Before:
  { position: 'center' }

After:
  { position: { x: 50, y: 50 } }
```

#### Example 5: Simple fix
```
fix: resolve TypeScript build errors
```

#### Example 6: Chore
```
chore(deps): update next to version 16.1.0
```

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

```
revert: feat(overlay): add rotation feature

This reverts commit 1234567890abcdef.
```

## Development Workflow

1. **Create a branch** following the naming convention:
   - `feat/feature-name` for new features
   - `fix/bug-description` for bug fixes
   - `docs/description` for documentation
   - `refactor/description` for refactoring

2. **Make incremental commits** with clear, conventional commit messages

3. **Keep commits focused**: Each commit should represent a single logical change

4. **Test locally**: 
   ```bash
   npm run dev      # Test in development
   npm run build    # Ensure production build works
   npm run lint     # Check for linting errors
   ```

5. **Keep your branch updated** with the main branch:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

## Pull Request Process

> **IMPORTANT**: All pull requests MUST use the PR template located at `.github/pull_request_template.md`

### Before Creating a PR

1. **Ensure all commits follow Conventional Commits**:
   ```bash
   git log --oneline
   # Each commit should follow: <type>(<scope>): <subject>
   ```

2. **Update documentation** if you're adding or changing functionality

3. **Test locally**:
   ```bash
   npm run dev      # Test in development
   npm run build    # Ensure production build works
   npm run lint     # Check for linting errors
   ```

### Creating the PR

1. **Push your branch** to your fork on GitHub

2. **Open a new Pull Request** - The PR template will automatically load

3. **Complete ALL sections of the PR template**:
   - Description
   - Type of Change (check all that apply)
   - Related Issues (use `Closes #123` or `Fixes #456`)
   - Changes Made (bullet list)
   - Screenshots/Videos (for UI changes)
   - Testing (test cases and manual steps)
   - Checklist (all items must be checked)
   - Breaking Changes (if applicable)
   - Additional Notes

4. **Use a descriptive PR title** following Conventional Commits:
   ```
   feat(upload): add drag-and-drop file upload support
   fix(overlay): correct text positioning on rotated images
   docs: update README with shadcn/ui information
   ```

### After Submitting

1. **Ensure CI passes**: All automated checks must pass

2. **Request review**: Wait for maintainer review before merging

3. **Address feedback**: Make requested changes and push new commits

4. **Keep branch updated**: Rebase with main if needed
   ```bash
   git fetch origin
   git rebase origin/main
   ```

5. **Squash commits** (optional): You may be asked to squash multiple commits into one

### PR Template Enforcement

- ❌ PRs that don't complete the template will be rejected
- ❌ PRs with non-conventional commit messages will require rebasing
- ✅ Complete templates help reviewers understand your changes
- ✅ Following the template speeds up the review process

See [.agent/workflows/create-pr.md](.agent/workflows/create-pr.md) for detailed PR creation workflow.

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use meaningful variable and function names

### React

- Use functional components with hooks
- Mark client components with `'use client'` directive
- Keep components small and focused
- Extract reusable logic into custom hooks

### Styling

- Use Tailwind CSS utility classes
- Use **shadcn/ui components** for UI elements (buttons, inputs, cards, etc.)
- Add new components with `npx shadcn@latest add [component]`
- Use the `cn()` utility from `@/lib/utils` for conditional class merging
- Follow mobile-first responsive design
- Use semantic HTML elements
- Ensure accessibility (ARIA labels, keyboard navigation)

**Example:**
```tsx
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Use shadcn/ui components
<Button variant="default">Click me</Button>

// Use cn() for conditional classes
<div className={cn("base-class", isActive && "active-class")} />
```

### File Naming

- Use kebab-case for file names: `image-upload.tsx`
- Use PascalCase for component names: `ImageUpload`
- Use camelCase for utility functions: `loadImageToCanvas`

### Code Organization

- One component per file
- Group related files in directories
- Keep utility functions in `lib/` directory
- Export from index files when appropriate

### Comments

- Write self-documenting code
- Add comments for complex logic
- Use JSDoc for function documentation
- Explain "why" not "what"

## Testing

While we're in the early stages, we encourage:

- Manual testing of all changes
- Testing across different browsers
- Testing with various image formats and sizes
- Verifying responsive design on mobile devices

## Questions?

If you have questions about contributing, feel free to:

- Open an issue for discussion
- Reach out to maintainers
- Check existing documentation in `.agent/` directory

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Mask Overlay! 🎉
