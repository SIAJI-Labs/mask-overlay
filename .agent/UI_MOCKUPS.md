# UI Mockups & Wireframes

This document provides visual guidance for implementing the Privacy Watermark Tool interface.

## Desktop Layout (≥768px)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header                                                              │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Privacy Watermark Tool              🔒 100% Offline • No Upload│ │
│  └────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  BEFORE IMAGE UPLOAD:                                               │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                                                                  │ │
│  │                     📁                                           │ │
│  │           Drag & Drop Image Here                                │ │
│  │              or click to browse                                 │ │
│  │                                                                  │ │
│  │       Supported: PNG, JPG, JPEG • Max Size: 10MB                │ │
│  │                                                                  │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  Footer: 🔒 Your privacy is protected. All processing happens       │
│           in your browser. No data is sent to any server.           │
└──────────────────────────────────────────────────────────────────────┘

---

AFTER IMAGE UPLOAD:

┌──────────────────────────────────────────────────────────────────────┐
│  Header                                                              │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Privacy Watermark Tool              🔒 100% Offline • No Upload│ │
│  └────────────────────────────────────────────────────────────────┘ │
├─────────────────────┬────────────────────────────────────────────────┤
│                     │                                                │
│  CONTROLS PANEL     │   PREVIEW CANVAS                              │
│  (340px width)      │   (Flexible width)                            │
│                     │                                                │
│  ┌───────────────┐  │   ┌────────────────────────────────────────┐ │
│  │ Quick Presets │  │   │                                        │ │
│  │ ┌───────────┐ │  │   │                                        │ │
│  │ │CONFIDENTIAL│ │ │   │                                        │ │
│  │ └───────────┘ │  │   │    [Live Preview Canvas]              │ │
│  │ ┌────────────┐│  │   │    Shows image with                   │ │
│  │ │FOR VERIFIC.││  │   │    watermark overlay                  │ │
│  │ └────────────┘│  │   │    updates in real-time               │ │
│  │ ┌──────┐┌────┐│  │   │                                        │ │
│  │ │SAMPLE││DRAFT││  │   │                                        │ │
│  │ └──────┘└────┘│  │   │                                        │ │
│  └───────────────┘  │   └────────────────────────────────────────┘ │
│                     │                                                │
│  Watermark Text     │                                                │
│  ┌───────────────┐  │                                                │
│  │ CONFIDENTIAL  │  │   filename.png                                │
│  └───────────────┘  │   1920 x 1080 px                              │
│  50/50 characters   │                                                │
│                     │                                                │
│  Pattern Mode       │                                                │
│  ┌────┐  ┌────────┐│                                                │
│  │Single│[Diagonal] │                                                │
│  │      │[Repeat]  ││                                                │
│  └────┘  └────────┘│                                                │
│                     │                                                │
│  Font Size: 36px    │                                                │
│  ┌─────────────────┐│                                                │
│  │●────────────────││                                                │
│  └─────────────────┘│                                                │
│  12px          72px │                                                │
│                     │                                                │
│  Text Color         │                                                │
│  ┌──┐┌──┐┌──┐ [🎨] │                                                │
│  │⬛││⬜││🟥││Picker││                                                │
│  └──┘└──┘└──┘ └───┘│                                                │
│                     │                                                │
│  Angle: -30°        │                                                │
│  ┌─────────────────┐│                                                │
│  │──────●──────────││                                                │
│  └─────────────────┘│                                                │
│  -45°             45°│                                               │
│                     │                                                │
│  Opacity: 30%       │                                                │
│  ┌─────────────────┐│                                                │
│  │●────────────────││                                                │
│  └─────────────────┘│                                                │
│  0%              100%│                                               │
│                     │                                                │
│  Export Format      │                                                │
│  ◉ PNG  ○ JPG       │                                                │
│                     │                                                │
│  ┌───────────────┐  │                                                │
│  │  🔄 Reset     │  │                                                │
│  └───────────────┘  │                                                │
│  ┌───────────────┐  │                                                │
│  │ ⬇️ Export     │  │                                                │
│  └───────────────┘  │                                                │
│                     │                                                │
└─────────────────────┴────────────────────────────────────────────────┘
```

---

## Mobile Layout (<768px)

```
┌────────────────────────────────┐
│  Header                        │
│  ┌──────────────────────────┐  │
│  │ Privacy Watermark        │  │
│  │ 🔒 100% Offline          │  │
│  └──────────────────────────┘  │
├────────────────────────────────┤
│                                │
│  CONTROLS (Collapsible)        │
│  ┌──────────────────────────┐  │
│  │ ▼ Watermark Controls     │  │
│  │                          │  │
│  │ Quick Presets            │  │
│  │ ┌──────┐ ┌─────────────┐│  │
│  │ │CONFID│ │FOR VERIFIC. ││  │
│  │ └──────┘ └─────────────┘│  │
│  │ ┌──────┐ ┌─────┐        │  │
│  │ │SAMPLE│ │DRAFT│        │  │
│  │ └──────┘ └─────┘        │  │
│  │                          │  │
│  │ Text Input               │  │
│  │ ┌──────────────────────┐│  │
│  │ │ CONFIDENTIAL         ││  │
│  │ └──────────────────────┘│  │
│  │ 13/50 characters         │  │
│  │                          │  │
│  │ Pattern: Diagonal Repeat │  │
│  │ Font Size: 36px          │  │
│  │ Color: Black             │  │
│  │ Angle: -30°              │  │
│  │ Opacity: 30%             │  │
│  │ Format: PNG              │  │
│  │                          │  │
│  │ [Full Controls ▼]        │  │
│  └──────────────────────────┘  │
│                                │
│  PREVIEW                       │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │                          │  │
│  │   [Canvas Preview]       │  │
│  │                          │  │
│  │                          │  │
│  └──────────────────────────┘  │
│  filename.png                  │
│  1920 x 1080 px                │
│                                │
│  ACTIONS                       │
│  ┌──────────────────────────┐  │
│  │      🔄 Reset            │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │     ⬇️ Export            │  │
│  └──────────────────────────┘  │
│                                │
└────────────────────────────────┘
```

---

## Component Specifications

### 1. Upload Area (No Image State)

```
┌────────────────────────────────────────────┐
│                                            │
│              📁 Drag & Drop                │
│          ┌──────────────────┐              │
│          │                  │              │
│          │   Drag file here │              │
│          │   or click       │              │
│          │                  │              │
│          └──────────────────┘              │
│                                            │
│   Supported: PNG, JPG, JPEG • Max: 10MB   │
│                                            │
└────────────────────────────────────────────┘

States:
- Default: Light gray background, dashed border
- Hover: Blue border highlight
- Drag Active: Blue background tint, solid border
- Error: Red border, error message below
```

### 2. Quick Presets

```
┌──────────────────────────────────┐
│ Quick Presets                    │
│ ┌────────────┐ ┌───────────────┐ │
│ │CONFIDENTIAL│ │FOR VERIFICATION│ │
│ └────────────┘ └───────────────┘ │
│ ┌──────┐ ┌─────┐                 │
│ │SAMPLE│ │DRAFT│                 │
│ └──────┘ └─────┘                 │
└──────────────────────────────────┘

Behavior:
- Click to fill text input
- Active preset highlighted
- Custom text removes active state
```

### 3. Slider Control (Generic)

```
┌──────────────────────────────────┐
│ Font Size: 36px             [36] │
│ ├────────●───────────────────────┤│
│ 12                              72│
└──────────────────────────────────┘

Features:
- Label with current value
- Min/max indicators
- Thumb draggable
- Click track to jump
- Keyboard arrows support
```

### 4. Color Picker

```
┌──────────────────────────────────┐
│ Text Color                       │
│ ┌───┐┌───┐┌───┐  ┌──────────┐   │
│ │ ⬛ ││ ⬜ ││ 🟥 │  │  Custom  │   │
│ └───┘└───┘└───┘  │  Picker  │   │
│   Black White Red └──────────┘   │
└──────────────────────────────────┘

Behavior:
- Preset buttons for quick selection
- Custom picker opens color input
- Active color has border highlight
```

### 5. Pattern Mode Toggle

```
┌──────────────────────────────────┐
│ Pattern Mode                     │
│ ┌────────────┐ ┌───────────────┐ │
│ │   Single   │ │Diagonal Repeat│ │
│ │  (Center)  │ │   (Secure)    │ │
│ └────────────┘ └───────────────┘ │
│     Inactive      [Active]       │
└──────────────────────────────────┘

States:
- Active: Blue background, white text
- Inactive: White background, gray text
- Hover: Slight blue tint
```

### 6. Export Format Selection

```
┌──────────────────────────────────┐
│ Export Format                    │
│ ◉ PNG (Lossless, larger)         │
│ ○ JPG (Compressed, smaller)      │
└──────────────────────────────────┘

Features:
- Radio buttons
- Descriptive labels
- PNG default
```

### 7. Action Buttons

```
┌──────────────────────────────────┐
│ ┌──────────────────────────────┐ │
│ │      🔄  Reset All           │ │
│ └──────────────────────────────┘ │
│                                  │
│ ┌──────────────────────────────┐ │
│ │   ⬇️  Export & Download      │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘

States:
- Reset: Gray/neutral color
- Export: Blue/primary color
- Disabled: Gray, reduced opacity
- Hover: Darker shade
- Loading: Spinner icon
```

---

## Canvas Preview Patterns

### Single Mode
```
┌────────────────────────────────┐
│                                │
│                                │
│        CONFIDENTIAL            │
│       (centered, rotated)      │
│                                │
│                                │
└────────────────────────────────┘
```

### Diagonal Repeat Mode
```
┌────────────────────────────────┐
│ CONFIDENTIAL    CONFIDENTIAL   │
│      CONFIDENTIAL    CONFIDENT │
│ IAL    CONFIDENTIAL    CONFIDE │
│ NTIAL    CONFIDENTIAL    CONFI │
│ DENTIAL    CONFIDENTIAL    CON │
│ FIDENTIAL    CONFIDENTIAL      │
└────────────────────────────────┘
```

---

## Color Palette

### Primary Colors
- **Primary Blue**: `#3B82F6` - Buttons, active states
- **Background**: `#FFFFFF` - Main background
- **Surface**: `#F9FAFB` - Cards, panels
- **Border**: `#E5E7EB` - Default borders

### Status Colors
- **Success Green**: `#10B981` - Privacy indicators
- **Warning Amber**: `#F59E0B` - File size warnings
- **Error Red**: `#EF4444` - Validation errors
- **Info Blue**: `#3B82F6` - Information

### Text Colors
- **Primary Text**: `#1F2937` - Main content
- **Secondary Text**: `#6B7280` - Labels, descriptions
- **Disabled Text**: `#9CA3AF` - Disabled elements

---

## Typography

### Font Families
- **Headings**: `Inter, system-ui, sans-serif`
- **Body**: `Inter, system-ui, sans-serif`
- **Monospace**: `'Courier New', monospace` (for character counter)

### Font Sizes
- **H1 (Page Title)**: 24px / 1.5rem
- **H2 (Section)**: 20px / 1.25rem
- **H3 (Subsection)**: 18px / 1.125rem
- **Body**: 16px / 1rem
- **Small**: 14px / 0.875rem
- **Tiny**: 12px / 0.75rem

---

## Spacing System

Based on Tailwind's 4px base unit:

- **xs**: 4px (0.25rem) - Tight spacing
- **sm**: 8px (0.5rem) - Small gaps
- **md**: 16px (1rem) - Default spacing
- **lg**: 24px (1.5rem) - Section spacing
- **xl**: 32px (2rem) - Large spacing
- **2xl**: 48px (3rem) - Page sections

---

## Interaction States

### Buttons
1. **Default**: Solid color, clear label
2. **Hover**: Slightly darker shade
3. **Active/Pressed**: Even darker, slight scale
4. **Disabled**: Gray, 50% opacity, no pointer
5. **Loading**: Spinner icon, disabled state

### Inputs
1. **Default**: Light border, white background
2. **Focus**: Blue border, slight glow
3. **Error**: Red border, error message below
4. **Disabled**: Gray background, no interaction

### Sliders
1. **Default**: Gray track, blue thumb
2. **Hover**: Larger thumb
3. **Dragging**: Emphasized thumb
4. **Focus**: Outline on thumb

---

## Accessibility Requirements

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys for sliders
- Escape to close modals/pickers

### Screen Readers
- ARIA labels on all controls
- Live region for preview updates
- Descriptive button labels
- Error announcements

### Visual
- Minimum 4.5:1 contrast ratio
- Focus indicators visible
- No color-only information
- Resizable text support

---

## Animations

### Subtle Transitions
- Button hover: 150ms ease
- Input focus: 200ms ease
- Panel expand: 300ms ease-out
- Loading spinner: continuous

### Micro-interactions
- Upload success: Checkmark animation
- Export complete: Download icon bounce
- Error shake: Horizontal shake on validation error

---

## Responsive Breakpoints

```css
/* Mobile First */
Default: 0px - 639px (Mobile portrait)
sm: 640px+ (Mobile landscape)
md: 768px+ (Tablet)
lg: 1024px+ (Desktop)
xl: 1280px+ (Large desktop)
```

**Key Changes:**
- < 768px: Stacked layout, collapsible controls
- ≥ 768px: Side-by-side layout
- Touch targets: Minimum 44x44px on mobile

---

## Implementation Notes

### Canvas Rendering
```javascript
// Pseudo-code for canvas rendering
function renderWatermark(ctx, config) {
  if (config.pattern === 'single') {
    drawTextCentered(ctx, config);
  } else {
    drawDiagonalPattern(ctx, config);
  }
}
```

### Real-time Updates
- Debounce slider inputs: 100ms
- Immediate text input updates
- Async canvas rendering to prevent blocking

---

**Created**: 2025-12-22  
**For**: Privacy Watermark Tool MVP  
**Reference**: Use with SPECIFICATIONS.md
