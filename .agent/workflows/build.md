---
description: Build the application for production
---

# Build for Production

This workflow builds the mask overlay application for production deployment.

## Steps

1. Ensure all dependencies are installed:
```bash
npm install
```

// turbo
2. Build the production bundle:
```bash
npm run build
```

3. (Optional) Test the production build locally:
```bash
npm start
```

## Output

The build process will:
- Compile TypeScript to JavaScript
- Optimize and bundle all assets
- Generate static pages where possible
- Create the `.next` directory with production artifacts

## Notes

- Build errors will be displayed in the console
- The production build is optimized for performance
- Static assets are optimized and compressed
- The build output can be deployed to Vercel or any Node.js hosting platform
