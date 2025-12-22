# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - Phase 2: UI Foundation
- Responsive layout with Header, MainLayout, and ControlsSidebar
- File upload with drag-and-drop and validation (PNG/JPG, max 10MB)
- Mobile-friendly bottom sheet for controls (via shadcn/ui Sheet)
- shadcn/ui components: button, card, input, label, slider, select, sheet

### Added - Phase 3: Canvas & Preview
- CanvasPreview component with HTML5 Canvas API
- Image rendering with aspect ratio maintenance
- Watermark overlay (single + diagonal repeat modes)
- Zoom controls (50%-300%) with pan/drag navigation
- Image rotation (0°/90°/180°/270°)
- Export functionality (PNG/JPG download)

### Added - Phase 4: Core Controls
- Text input with 50-char limit and presets
- Pattern mode toggle (Single / Diagonal Repeat)
- Font size, opacity, and angle sliders
- Color picker with presets + custom colors
- Text gap control (diagonal mode)
- X/Y offset positioning (single mode)

## [0.1.0] - 2025-12-22

### Added
- Initial project setup with Next.js 16.1
- TypeScript configuration
- Tailwind CSS 4 with shadcn/ui (New York style)
- Project documentation structure
- Contributing guidelines with Conventional Commits
- Pull request template
- Product specifications document
- UI mockups and design system
- Development roadmap with 7 phases
- Agent workflows for development
- MIT License

### Documentation
- README with project overview and features
- SPECIFICATIONS.md with complete MVP requirements
- UI_MOCKUPS.md with wireframes and design system
- ROADMAP.md with implementation phases
- CONTRIBUTING.md with contribution guidelines
- QUICK_REFERENCE.md for developers
- Workflow guides for commits, PRs, and components

---

## Version History

### [Unreleased]
- Planning and documentation phase
- Ready for Phase 2 (UI Foundation) implementation

### [0.1.0] - 2025-12-22
- Initial release with complete documentation
- Foundation phase complete
- Ready for development

---

## Categories

This changelog uses the following categories:

- **Added** - New features or files
- **Changed** - Changes to existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements or fixes
- **Documentation** - Documentation changes

---

**Note**: Once development begins, update this file with each significant change or release.
