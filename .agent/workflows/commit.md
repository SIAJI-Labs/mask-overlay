---
description: Make a conventional commit
---

# Making Conventional Commits

This workflow helps you create commits following the Conventional Commits specification.

## Commit Message Format

```
<type>(<scope>): <subject>
```

### Common Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic changes)
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks

### Common Scopes (for this project)

- `upload`: Image upload functionality
- `overlay`: Text overlay engine
- `ui`: User interface components
- `config`: Configuration
- `deps`: Dependencies

## Examples

### Feature commit
```bash
git commit -m "feat(upload): add drag-and-drop support"
```

### Bug fix commit
```bash
git commit -m "fix(overlay): correct text positioning on rotated images"
```

### Documentation commit
```bash
git commit -m "docs: update contributing guidelines"
```

### Dependency update
```bash
git commit -m "chore(deps): upgrade next to 16.1.0"
```

### Breaking change
```bash
git commit -m "feat(overlay)!: change configuration API

BREAKING CHANGE: overlay config structure changed"
```

## Steps

1. Stage your changes:
```bash
git add <files>
```

2. Commit with conventional message:
```bash
git commit -m "<type>(<scope>): <subject>"
```

3. (Optional) Add detailed body:
```bash
git commit -m "<type>(<scope>): <subject>" -m "<detailed description>"
```

## Tips

- Use present tense: "add feature" not "added feature"
- Keep subject under 72 characters
- Don't capitalize first letter of subject
- No period at the end of subject
- Use body to explain "what" and "why", not "how"

## Reference

See [CONTRIBUTING.md](../CONTRIBUTING.md) for full conventional commits specification.
