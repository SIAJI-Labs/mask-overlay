# Mask Overlay for Confidential Documents

A web-based tool for creating secure text overlays on confidential documents such as Personal Identification documents. This application applies customizable text masks that are difficult to remove while maintaining document readability for verification purposes.

## Overview

When sharing sensitive documents (IDs, passports, etc.) for verification, you often need to protect confidential information while keeping the document readable. This tool provides a robust masking solution by overlaying text patterns on images that are integrated with the content, making them difficult to remove without damaging the underlying document.

## Features

### MVP Features

- 🖼️ **Drag & Drop Upload**: Easy file upload with drag-and-drop support (PNG, JPG up to 10MB)
- 🔍 **Advanced Preview Controls**:
  - Real-time canvas preview showing exactly what will be exported
  - Zoom in/out (50%-300%) with pan/drag navigation
  - Image rotation (90° increments) for orientation correction
- 📝 **Text Customization**: 
  - Custom text input with quick presets (CONFIDENTIAL, FOR VERIFICATION, SAMPLE, DRAFT)
  - Font size control (12-72px)
  - Color picker with presets (Black, White, Red) + custom colors
- 🎨 **Watermark Patterns**:
  - **Single Mode**: Positioned watermark with X/Y offset control
  - **Diagonal Repeat Mode**: Repeating pattern with customizable text gap
- ⚙️ **Fine-tune Controls**:
  - Angle adjustment (-45° to 45°)
  - Transparency/opacity control (0-100%)
  - Text gap spacing (diagonal mode)
  - X/Y offset positioning (single mode)
- 💾 **Export Options**: Download in PNG or JPG format
- 🔒 **Privacy First**: 100% client-side processing - your documents never leave your device
- 📱 **Responsive Design**: Mobile-friendly with bottom sheet controls on small screens
- 📱 **PWA Support**: Install as desktop/mobile app for offline use with zero data transfer

📋 **Full Specifications**: See [.agent/SPECIFICATIONS.md](.agent/SPECIFICATIONS.md) for detailed feature specifications and implementation plan.

## Use Cases

- Masking Personal Identification documents for online verification
- Protecting sensitive information in document uploads
- Creating watermarked copies of confidential documents
- Secure document sharing with visible authenticity markers

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

1. Upload a document image
2. Configure the text overlay (content, style, position)
3. Preview the masked document
4. Download the final masked image

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (New York style)
- **Icons**: Lucide React
- **Image Processing**: Canvas API
- **Testing**: Vitest + Testing Library
- **PWA**: next-pwa

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - TypeScript type checking
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report

## Privacy & Security


All image processing is performed **client-side** in your browser. Your sensitive documents never leave your device, ensuring maximum privacy and security.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Quick Commit Guide

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification. Example:

```bash
git commit -m "feat(upload): add drag-and-drop support"
git commit -m "fix(overlay): correct text positioning"
git commit -m "docs: update README"
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Project Structure

See [.agent/README.md](.agent/README.md) for detailed agent documentation and project structure.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

Built with [Next.js](https://nextjs.org) ❤️
