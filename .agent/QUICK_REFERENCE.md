# Quick Reference Guide

## Common Commands

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

### shadcn/ui Components
```bash
# Add a new component (e.g., Button)
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card input label

# List available components
npx shadcn@latest add
```

### Git & Contribution

```bash
# Conventional Commit format
git commit -m "type(scope): subject"

# Examples
git commit -m "feat(upload): add drag-and-drop support"
git commit -m "fix(overlay): correct text positioning"
git commit -m "docs: update README"

# Check commit history
git log --oneline

# Create PR branch
git checkout -b feat/your-feature-name
```

**Required Standards:**
- ✅ All commits MUST follow [Conventional Commits](https://www.conventionalcommits.org/)
- ✅ All PRs MUST use the template in `.github/pull_request_template.md`
- ✅ See [CONTRIBUTING.md](../CONTRIBUTING.md) for full guidelines


### Project Structure
```
mask-overlay/
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/           # React components
│   └── ui/              # shadcn/ui components
├── lib/                  # Shared utilities
│   └── utils.ts         # cn() helper
├── public/               # Static assets
└── .agent/              # Agent documentation
    ├── README.md        # Project overview
    ├── ROADMAP.md       # Status & roadmap
    └── workflows/       # Workflow definitions
```

## Key Files

- **`app/page.tsx`**: Main application page (where the UI will be built)
- **`app/layout.tsx`**: Root layout with metadata
- **`app/globals.css`**: Global styles and Tailwind configuration
- **`components/ui/`**: shadcn/ui components directory
- **`lib/utils.ts`**: Utility functions including `cn()` for class merging
- **`components.json`**: shadcn/ui configuration
- **`package.json`**: Dependencies and scripts

## Available Libraries

- **shadcn/ui**: Pre-built accessible components - Add with `npx shadcn@latest add [component]`
- **Lucide React**: Icon library - `import { IconName } from 'lucide-react'`
- **Tailwind CSS**: Utility-first CSS framework
- **cn()**: Utility for merging class names - `import { cn } from '@/lib/utils'`

## Next.js App Router Conventions

- **Server Components**: Default (no 'use client')
- **Client Components**: Add `'use client'` at top of file
- **Routing**: File-based routing in `app/` directory
- **API Routes**: Create `route.ts` in `app/api/` directory

## Canvas API Basics (for Image Processing)

```typescript
// Create canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Load image
const img = new Image();
img.src = 'path/to/image';
img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  
  // Add text overlay
  ctx.font = '48px Arial';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillText('CONFIDENTIAL', x, y);
  
  // Export
  const dataUrl = canvas.toDataURL('image/png');
};
```

## Tailwind CSS Quick Reference

```css
/* Layout */
flex, grid, container

/* Spacing */
p-4, m-4, gap-4

/* Colors */
bg-blue-500, text-white

/* Typography */
text-lg, font-bold

/* Effects */
shadow-lg, rounded-lg, opacity-50
```

## Useful Snipets

### File Upload Component Pattern
```tsx
'use client';

import { useState } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  return (
    <input 
      type="file" 
      accept="image/*"
      onChange={handleFileChange}
    />
  );
}
```

### Image to Canvas Pattern
```tsx
const loadImageToCanvas = (file: File): Promise<HTMLCanvasElement> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas);
    };
    
    img.src = URL.createObjectURL(file);
  });
};
```

### Using shadcn/ui Components
```tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="file">Choose file</Label>
            <Input id="file" type="file" accept="image/*" />
          </div>
          <Button>Process Image</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Using cn() Utility
```tsx
import { cn } from '@/lib/utils';

// Conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  "another-class"
)} />

// Merging with conflicts (twMerge handles this)
<div className={cn("p-4 bg-red-500", "bg-blue-500")} />
// Result: "p-4 bg-blue-500" (blue overrides red)
```

## Debugging Tips

1. **Use React DevTools**: Install browser extension
2. **Console logs**: `console.log()` for debugging
3. **Next.js Error Overlay**: Shows errors in dev mode
4. **TypeScript errors**: Check terminal output

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [Canvas API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
