---
description: Add shadcn/ui components
---

# Adding shadcn/ui Components

This workflow guides you through adding shadcn/ui components to the project.

## What is shadcn/ui?

shadcn/ui is a collection of beautifully designed, accessible, and customizable React components built with Tailwind CSS. Components are added directly to your project (not as a dependency), giving you full control.

## Configuration

This project is already configured with shadcn/ui:
- **Style**: New York
- **Base Color**: Neutral
- **CSS Variables**: Enabled
- **Icon Library**: Lucide React

## Adding Components

### Single Component

// turbo
1. Add a component (e.g., Button):
```bash
npx shadcn@latest add button
```

The component will be added to `components/ui/button.tsx`

### Multiple Components

// turbo
2. Add multiple components at once:
```bash
npx shadcn@latest add button card input label
```

### List Available Components

// turbo
3. See all available components:
```bash
npx shadcn@latest add
```

## Using Components

Import and use components in your React files:

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <Button>Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Commonly Used Components for This Project

- **Button**: `npx shadcn@latest add button`
- **Card**: `npx shadcn@latest add card`
- **Input**: `npx shadcn@latest add input`
- **Label**: `npx shadcn@latest add label`
- **Slider**: `npx shadcn@latest add slider` (for opacity, size controls)
- **Select**: `npx shadcn@latest add select` (for font selection)
- **Dialog**: `npx shadcn@latest add dialog` (for modals)
- **Tabs**: `npx shadcn@latest add tabs` (for organizing controls)
- **Progress**: `npx shadcn@latest add progress` (for upload progress)

## Customization

Once added, components are in your `components/ui/` directory and can be customized:
- Modify styles with Tailwind classes
- Add new variants
- Extend functionality

## Using cn() Utility

The `cn()` utility (already in `lib/utils.ts`) helps merge Tailwind classes:

```tsx
import { cn } from '@/lib/utils';

<Button className={cn("w-full", isLoading && "opacity-50")} />
```

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Component Examples](https://ui.shadcn.com/docs/components)
- [Theming Guide](https://ui.shadcn.com/docs/theming)

## Notes

- Components are added to your codebase, not installed as dependencies
- You have full control to customize components
- All components are built with accessibility in mind
- TypeScript is fully supported
