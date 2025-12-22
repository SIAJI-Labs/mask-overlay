# Mask Overlay Project - Agent Documentation

## Project Overview

This project provides a web-based tool for creating secure text overlays on confidential documents, particularly Personal Identification documents. The overlay system applies customizable text masks that are difficult to remove while maintaining document readability for verification purposes.

## Purpose

When sharing sensitive documents (IDs, passports, etc.), users need to:
- **Protect confidential information** with visible markers
- **Maintain document readability** for authorized verification
- **Prevent easy manipulation** of the masked content

The mask overlay tool achieves this by applying integrated text patterns directly onto images, making removal difficult without damaging the underlying document.

## Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **Build Tool**: Next.js build system

## Project Structure

```
mask-overlay/
├── app/              # Next.js app router pages and layouts
├── components/       # React components (will be created)
│   └── ui/          # shadcn/ui components
├── lib/              # Utility functions and shared logic
│   └── utils.ts     # cn() helper for class merging
├── public/           # Static assets
├── components.json   # shadcn/ui configuration
└── .agent/           # Agent documentation and workflows
    └── workflows/    # Workflow definitions
```

## Key Features (Planned/To Implement)

1. **Image Upload**: Allow users to upload documents for masking
2. **Text Overlay Configuration**: Customize overlay text, style, position, and opacity
3. **Multiple Mask Patterns**: Support various masking strategies
4. **Preview & Download**: Real-time preview with download capability
5. **Responsive Design**: Works across different devices

## Development Workflow

### Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Access at: http://localhost:3000

### Contribution Standards

> [!IMPORTANT]
> All contributions to this project MUST follow the established standards.

**Required for ALL contributions:**

1. **Conventional Commits**: Every commit must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
   - Format: `<type>(<scope>): <subject>`
   - Examples: `feat(upload): add drag-and-drop`, `fix(overlay): correct positioning`
   - See [CONTRIBUTING.md](../CONTRIBUTING.md) and [commit workflow](.agent/workflows/commit.md)

2. **Pull Request Template**: All PRs must use the provided PR template
   - Location: `.github/pull_request_template.md`
   - Complete ALL sections of the template
   - See [PR workflow](.agent/workflows/create-pr.md)

3. **Contributing Guidelines**: Follow all guidelines in [CONTRIBUTING.md](../CONTRIBUTING.md)
   - Code style and formatting
   - Testing requirements
   - Documentation updates
   - shadcn/ui component usage

**Workflow References:**
- [Making Commits](.agent/workflows/commit.md) - How to create conventional commits
- [Creating PRs](.agent/workflows/create-pr.md) - How to create pull requests
- [Adding Components](.agent/workflows/add-shadcn-components.md) - How to add shadcn/ui components

**Enforcement:**
- PRs that don't follow the template will be rejected
- Commits not following Conventional Commits will need to be rebased
- Code not following style guidelines will require changes

### Key Considerations

- **Security**: Ensure uploaded images are processed client-side when possible
- **Performance**: Optimize image processing for large files
- **UX**: Make the masking process intuitive and fast
- **Accessibility**: Ensure the interface is accessible to all users

## Implementation Approach

### Image Processing Strategy

The overlay system should:
1. Accept image uploads (common formats: PNG, JPG, PDF)
2. Apply text overlays with configurable:
   - Text content (e.g., "CONFIDENTIAL", "FOR VERIFICATION ONLY")
   - Font size, style, and color
   - Position and rotation
   - Opacity and blending modes
3. Render the masked image for preview
4. Export the final masked document

### Technical Considerations

- **Client-side processing**: Use Canvas API or image processing libraries
- **No server upload**: Keep sensitive documents on the client for privacy
- **Export formats**: Support PNG/JPG output, potentially PDF
- **Mask persistence**: Ensure overlays are "baked in" and difficult to remove
- **UI Components**: Use shadcn/ui for consistent, accessible interface components

## Current Status

🚀 **Initial Setup Phase**
- Next.js project initialized
- Agent documentation structure created
- Ready for feature implementation

## Next Steps

1. Design the user interface for image upload and overlay configuration
2. Implement image processing logic (Canvas API or library like fabric.js)
3. Create overlay customization controls
4. Add preview and download functionality
5. Test with various document types and sizes
