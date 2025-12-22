# Mask Overlay - Product Specifications

**Version**: 1.0 MVP  
**Last Updated**: 2025-12-22  
**Status**: Planning Phase

## Executive Summary

A privacy-first web application for applying text watermarks/overlays to confidential documents. The tool runs entirely client-side with PWA support for offline use, ensuring no data ever leaves the user's device.

## Core Objectives

1. **Privacy First**: All processing happens client-side (no server uploads)
2. **Ease of Use**: Simple, intuitive interface for non-technical users
3. **Offline Capable**: PWA support for desktop/mobile offline usage
4. **Effective Masking**: Make watermarks difficult to remove while maintaining readability

## Target Users

- Individuals sharing ID documents for verification
- Remote workers submitting documents to employers
- Anyone needing to protect sensitive document information
- Users concerned about document privacy and security

---

## MVP Feature Specifications

### 1. File Upload

**Description**: Allow users to upload document images for watermarking.

**Requirements**:
- ✅ Drag-and-drop support
- ✅ Click-to-browse file picker
- ✅ Supported formats: PNG, JPG, JPEG
- ✅ Maximum file size: 10MB
- ✅ Clear error messages for unsupported formats or oversized files
- ✅ Visual feedback during drag (hover state)

**User Stories**:
- As a user, I want to drag and drop my document so I can quickly start the masking process
- As a user, I want to see clear error messages if my file is too large or unsupported

**Acceptance Criteria**:
- [ ] File can be uploaded via drag-and-drop
- [ ] File can be uploaded via click-to-browse
- [ ] Only PNG/JPG/JPEG files are accepted
- [ ] Files over 10MB show error message
- [ ] Upload area shows visual feedback on drag hover

---

### 2. Canvas Preview

**Description**: Real-time preview of the document with applied watermark.

**Requirements**:
- ✅ Live preview canvas displaying uploaded image
- ✅ Real-time updates when any control changes
- ✅ Maintain aspect ratio of original image
- ✅ Fit-to-screen responsive sizing
- ✅ Preview shows exactly what will be exported

**User Stories**:
- As a user, I want to see changes in real-time so I can quickly adjust the watermark
- As a user, I want the preview to match the final export so there are no surprises

**Acceptance Criteria**:
- [ ] Canvas displays uploaded image immediately
- [ ] All control changes update canvas in real-time
- [ ] Original image aspect ratio is maintained
- [ ] Canvas is responsive and fits screen size
- [ ] Preview matches exported result

---

### 3. Text Input & Presets

**Description**: Configure the watermark text content.

**Requirements**:
- ✅ Text input field (50 character limit)
- ✅ Quick preset buttons:
  - "CONFIDENTIAL"
  - "FOR VERIFICATION ONLY"
  - "SAMPLE"
  - "DRAFT"
- ✅ Real-time text preview
- ✅ Character counter display

**User Stories**:
- As a user, I want quick presets so I don't have to type common phrases
- As a user, I want to enter custom text for specific needs
- As a user, I want to know the character limit before I exceed it

**Acceptance Criteria**:
- [ ] Text input updates preview in real-time
- [ ] Character limit is 50 characters
- [ ] Four preset buttons available
- [ ] Clicking preset fills text input
- [ ] Character counter shows remaining/used characters

---

### 4. Pattern Mode

**Description**: Toggle between single watermark and repeating diagonal pattern.

**Requirements**:
- ✅ Two modes:
  - **Single**: Watermark placed in center
  - **Diagonal Repeat**: Repeating pattern across entire document
- ✅ Toggle control (button group or select)
- ✅ Real-time preview update

**User Stories**:
- As a user, I want to choose between single and repeating watermarks for different security levels
- As a user, I want the pattern to cover the entire document to prevent easy removal

**Acceptance Criteria**:
- [ ] Single mode displays one centered watermark
- [ ] Diagonal Repeat mode displays repeating pattern
- [ ] Pattern covers entire document evenly
- [ ] Switching modes updates preview immediately
- [ ] Default mode is Diagonal Repeat

---

### 5. Font Size Control

**Description**: Adjust the size of the watermark text.

**Requirements**:
- ✅ Slider control (12px - 72px range)
- ✅ Display current value
- ✅ Real-time preview update
- ✅ Default: 36px

**User Stories**:
- As a user, I want to adjust text size to match my document dimensions
- As a user, I want to see the size value as I adjust the slider

**Acceptance Criteria**:
- [ ] Slider ranges from 12px to 72px
- [ ] Current size value is displayed
- [ ] Preview updates in real-time
- [ ] Default value is 36px

---

### 6. Text Color Picker

**Description**: Choose the color of the watermark text.

**Requirements**:
- ✅ Quick color presets:
  - Black (default)
  - White
  - Red
- ✅ Custom color picker
- ✅ Real-time preview update

**User Stories**:
- As a user, I want quick color presets for common choices
- As a user, I want to choose a custom color to match my document
- As a user, I want to ensure the watermark is visible on my document background

**Acceptance Criteria**:
- [ ] Three preset color buttons available
- [ ] Custom color picker available
- [ ] Preview updates in real-time
- [ ] Default color is black

---

### 7. Angle Control

**Description**: Rotate the watermark text.

**Requirements**:
- ✅ Slider control (-45° to 45° range)
- ✅ Display current angle value
- ✅ Real-time preview update
- ✅ Default: -30° (diagonal watermark)

**User Stories**:
- As a user, I want to rotate the watermark diagonally for better security
- As a user, I want to see the exact angle value

**Acceptance Criteria**:
- [ ] Slider ranges from -45° to 45°
- [ ] Current angle value is displayed
- [ ] Preview updates in real-time
- [ ] Default value is -30°
- [ ] In Diagonal Repeat mode, pattern follows angle

---

### 8. Transparency/Opacity Control

**Description**: Adjust the opacity of the watermark.

**Requirements**:
- ✅ Slider control (0% - 100% range)
- ✅ Display current opacity value
- ✅ Real-time preview update
- ✅ Default: 30%

**User Stories**:
- As a user, I want to adjust opacity so the document remains readable
- As a user, I want to balance watermark visibility with document legibility

**Acceptance Criteria**:
- [ ] Slider ranges from 0% to 100%
- [ ] Current opacity value is displayed
- [ ] Preview updates in real-time
- [ ] Default value is 30%
- [ ] 0% = fully transparent, 100% = fully opaque

---

### 9. Export Format Selection

**Description**: Choose the output format for the watermarked document.

**Requirements**:
- ✅ Format options:
  - PNG (default, lossless)
  - JPG (smaller file size)
- ✅ Radio buttons or select dropdown
- ✅ Show file size estimate (if feasible)

**User Stories**:
- As a user, I want to choose PNG for highest quality
- As a user, I want to choose JPG for smaller file size

**Acceptance Criteria**:
- [ ] PNG and JPG options available
- [ ] PNG is default format
- [ ] Selection is visually indicated
- [ ] Export uses selected format

---

### 10. Reset & Export Actions

**Description**: Control buttons for workflow completion.

**Requirements**:

**Reset Button**:
- ✅ Clears uploaded image
- ✅ Resets all controls to default values
- ✅ Confirmation dialog (optional but recommended)
- ✅ Keyboard shortcut: Ctrl/Cmd + R

**Export/Download Button**:
- ✅ Downloads watermarked image
- ✅ Filename: `[original-name]-watermarked.[ext]`
- ✅ Uses selected export format
- ✅ Disabled when no image uploaded
- ✅ Visual feedback during export

**User Stories**:
- As a user, I want to reset and start over without refreshing the page
- As a user, I want to download my watermarked document with a clear filename

**Acceptance Criteria**:
- [ ] Reset button clears all data and resets controls
- [ ] Export button downloads watermarked image
- [ ] Downloaded file has descriptive filename
- [ ] Buttons are clearly labeled and accessible
- [ ] Export disabled when no image is uploaded

---

## PWA (Progressive Web App) Specifications

### Offline Capability

**Description**: Full functionality without internet connection.

**Requirements**:
- ✅ Service Worker implementation
- ✅ Cache all static assets (HTML, CSS, JS, icons)
- ✅ Offline fallback page
- ✅ All processing done client-side (no API calls)

**User Stories**:
- As a user, I want to use the app offline so my documents never touch a server
- As a user, I want confidence that my data stays on my device

**Acceptance Criteria**:
- [ ] App loads and functions without internet
- [ ] Service worker caches all necessary assets
- [ ] No network requests made during operation
- [ ] Offline status visible to user

---

### Installability

**Description**: Allow users to install app to desktop/home screen.

**Requirements**:
- ✅ Web App Manifest with:
  - App name: "Privacy Watermark Tool"
  - Short name: "Privacy Mask"
  - Description: "Add secure watermarks to confidential documents offline"
  - Icons: 192x192, 512x512
  - Start URL
  - Display: standalone
  - Theme color
- ✅ Install prompt (subtle, non-intrusive)
- ✅ App icons for various platforms

**User Stories**:
- As a user, I want to install the app to my desktop for easy access
- As a user, I want the app to feel like a native application

**Acceptance Criteria**:
- [ ] App can be installed on desktop
- [ ] App can be added to home screen on mobile
- [ ] Icons display correctly
- [ ] App opens in standalone mode (no browser UI)

---

### Privacy Messaging

**Description**: Clear communication about privacy and offline operation.

**Requirements**:
- ✅ Prominent "🔒 100% Offline" badge in header
- ✅ Privacy statement on landing/upload area
- ✅ Offline indicator when running without connection
- ✅ About/Info section explaining privacy approach

**User Stories**:
- As a user, I want assurance that my documents aren't uploaded
- As a user, I want to know when I'm truly offline

**Acceptance Criteria**:
- [ ] Privacy badge visible on all pages
- [ ] Offline status clearly indicated
- [ ] Privacy explanation accessible
- [ ] No ambiguity about data handling

---

## User Interface Specifications

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  Header                                             │
│  ┌─────────────────────────────────────┐           │
│  │ Privacy Watermark Tool               │           │
│  │ 🔒 100% Offline - No Data Transfer  │           │
│  └─────────────────────────────────────┘           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Upload Area (when no image)                       │
│  ┌─────────────────────────────────────┐           │
│  │   📁 Drag & Drop Image Here          │           │
│  │   or click to browse                 │           │
│  │                                      │           │
│  │   Supported: PNG, JPG • Max: 10MB   │           │
│  └─────────────────────────────────────┘           │
│                                                     │
├────────────────┬────────────────────────────────────┤
│                │                                    │
│  Controls      │   Canvas Preview                  │
│  Panel         │   (Live Update)                   │
│  (Sidebar)     │                                   │
│                │                                    │
│  Quick Presets │                                    │
│  Text Input    │                                    │
│  Pattern Mode  │                                    │
│  Font Size     │                                    │
│  Color         │                                    │
│  Angle         │                                    │
│  Opacity       │                                    │
│  Format        │                                    │
│                │                                    │
│  [Reset]       │                                    │
│  [Export]      │                                    │
│                │                                    │
└────────────────┴────────────────────────────────────┘
│  Footer - Privacy Info                             │
└─────────────────────────────────────────────────────┘
```

### Responsive Behavior

**Desktop (≥768px)**:
- Side-by-side layout (controls left, preview right)
- Controls panel: 320px width
- Preview: Flexible width

**Mobile/Tablet (<768px)**:
- Stacked layout (controls above preview)
- Full-width components
- Collapsible controls section
- Preview maximizes available space

---

## Technical Implementation Notes

### Canvas Processing

- Use HTML5 Canvas API for rendering
- Apply watermark directly to canvas (not as overlay)
- Ensure watermark is "baked in" to exported image
- For Diagonal Repeat: Calculate pattern spacing based on image size

### File Handling

- Use FileReader API to load images
- No files sent to server
- Memory cleanup after export (revoke object URLs)

### Performance

- Debounce slider inputs (100ms) to prevent excessive re-renders
- Optimize canvas re-drawing
- Lazy load preview updates for better UX

### Accessibility

- ARIA labels on all controls
- Keyboard navigation support
- Focus visible indicators
- Screen reader friendly
- Color contrast compliance (WCAG AA)

---

## Future Enhancements (Post-MVP)

### Phase 2 Features

1. **Preview Zoom Controls**
   - Zoom in/out to inspect detail
   - Pan around zoomed preview

2. **Position Controls** (for Single mode)
   - X/Y sliders or preset positions
   - Center, corners, edges

3. **Font Family Selection**
   - 3-5 web-safe fonts
   - Impact, Arial, Times, Courier

### Phase 3 Features

4. **Multiple Text Layers**
   - Add secondary watermark
   - Different styles for each layer

5. **Blend Modes**
   - Normal, Multiply, Overlay
   - Screen, Soft Light

6. **Batch Processing**
   - Upload multiple files
   - Apply same settings to all
   - Bulk export

7. **Save/Load Presets**
   - Save custom configurations
   - Quick apply saved settings

8. **PDF Support**
   - Input: PDF to image conversion
   - Output: PDF generation

---

## Success Metrics

### MVP Success Criteria

1. **Functional**:
   - All core features working without bugs
   - Exports produce correct watermarked images
   - PWA installs and works offline

2. **Performance**:
   - Preview updates within 100ms
   - Export completes within 2 seconds
   - Supports images up to 10MB

3. **User Experience**:
   - Complete workflow in under 30 seconds
   - Intuitive controls (no tutorial needed)
   - Mobile responsive and usable

4. **Privacy**:
   - Zero network requests during operation
   - Works completely offline
   - Clear privacy messaging

---

## Development Phases

> 💪 **Phase-Based Development Approach**  
> Flexible phases that can be completed sequentially or in parallel based on collaboration.

### Phase 1: Foundation ✅ (Complete)
- [x] Project setup and configuration
- [x] UI component library (shadcn/ui)
- [x] Documentation structure
- [x] Product specifications

---

### Phase 2: UI Foundation
**Goal**: Build complete interface structure

- [ ] Basic layout and responsive design
- [ ] Header with privacy badge
- [ ] File upload component (drag-and-drop)
- [ ] Control panel sidebar layout
- [ ] Error handling UI

**Components**: button, card, input, label, slider, select

---

### Phase 3: Canvas & Preview
**Goal**: Implement core rendering system

- [ ] Canvas preview implementation
- [ ] Image rendering on canvas
- [ ] Text overlay rendering
- [ ] Real-time preview updates
- [ ] Aspect ratio handling

---

### Phase 4: Core Controls
**Goal**: Build all watermark controls

- [ ] All control inputs (sliders, color, etc.)
- [ ] Text input with presets
- [ ] Pattern mode toggle
- [ ] Real-time control updates

---

### Phase 5: Actions & Polish
**Goal**: Export functionality and refinement

- [ ] Pattern mode (diagonal repeat)
- [ ] Export functionality
- [ ] Reset functionality
- [ ] Error handling and validation
- [ ] Mobile optimization
- [ ] Accessibility improvements

---

### Phase 6: PWA Implementation
**Goal**: Offline capability

- [ ] Service Worker implementation
- [ ] Web App Manifest
- [ ] Offline support
- [ ] Install prompts
- [ ] Offline indicator

---

### Phase 7: Testing & Launch
**Goal**: Quality assurance and deployment

- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation finalization
- [ ] Launch! 🚀

---

## Design Guidelines

### Color Scheme

- **Primary**: Blue (#3B82F6) - Trust, technology
- **Background**: White/Light Gray (#F9FAFB)
- **Text**: Dark Gray (#1F2937)
- **Accent**: Green (#10B981) - Success, privacy
- **Warning**: Amber (#F59E0B) - File size warnings
- **Error**: Red (#EF4444) - Errors

### Typography

- **Headings**: Inter or similar sans-serif
- **Body**: System fonts for performance
- **Monospace**: For character counter

### Spacing

- Base unit: 4px (Tailwind default)
- Component spacing: 16px (4 units)
- Section spacing: 24px (6 units)

---

## Security & Privacy Considerations

1. **No Server Communication**: Absolutely no uploads or API calls
2. **Client-Side Only**: All processing in browser
3. **No Analytics**: No tracking, no cookies
4. **Memory Cleanup**: Proper cleanup of file objects and URLs
5. **HTTPS Only**: Force HTTPS in production
6. **Open Source**: Transparent code for trust

---

## Browser Support

### Minimum Requirements

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Required Features

- Canvas API
- FileReader API
- Service Workers
- ES6+ JavaScript
- CSS Grid & Flexbox

---

**Document Version**: 1.0  
**Created**: 2025-12-22  
**Next Review**: After MVP completion
