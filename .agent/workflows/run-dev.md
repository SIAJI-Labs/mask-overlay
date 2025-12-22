---
description: Run the development server
---

# Run Development Server

This workflow starts the Next.js development server for the mask overlay application.

## Steps

// turbo
1. Start the development server:
```bash
npm run dev
```

2. The application will be available at http://localhost:3000

3. The development server includes:
   - Hot module replacement (HMR)
   - Fast refresh for React components
   - Automatic TypeScript compilation
   - Error overlay for debugging

## Notes

- The server will continue running until you stop it (Ctrl+C)
- Changes to files are automatically reflected in the browser
- Port 3000 is the default; if occupied, Next.js will use the next available port
