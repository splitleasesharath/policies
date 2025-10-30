# Visual Design Guide - Policies Page

This guide shows the visual layout and design of the policies page.

---

## 📱 Page Layout

### Desktop View (>900px)

```
┌─────────────────────────────────────────────────────────────────────┐
│                           HEADER (Fixed)                             │
│  ┌─────┐                                                            │
│  │Logo │  Split Lease    Host▼   Stay▼    [Explore] [Sign In/Up]  │
│  └─────┘                                                            │
└─────────────────────────────────────────────────────────────────────┘
        ↑ 70px tall, gradient purple background, fixed position

┌───────────────┬─────────────────────────────────────────────────────┐
│               │                                                     │
│  Contents     │    Cancellation and Refund Policy        [↓]      │
│               │                                                     │
│  • Background │    ┌───────────────────────────────────────────┐  │
│  • Cancella.. │    │                                           │  │
│  • Community  │    │        PDF VIEWER                         │  │
│  • Cookie     │    │                                           │  │
│  • Fees       │    │        [Embedded PDF Document]            │  │
│  • Host Guar  │    │                                           │  │
│  • Host Gua.. │    │                                           │  │
│  • Payments   │    │                                           │  │
│  • Privacy    │    │                                           │  │
│  • Terms      │    │                                           │  │
│               │    └───────────────────────────────────────────┘  │
│               │                                                     │
│   25% width   │                  70% width                          │
│   Sticky      │                                                     │
└───────────────┴─────────────────────────────────────────────────────┘
                           ↓ Back to Top ↓

┌─────────────────────────────────────────────────────────────────────┐
│                              FOOTER                                  │
│  ┌──────────┬──────────┬──────────┬─────────────────────────┐     │
│  │For Hosts │For Guests│ Company  │   Refer a Friend        │     │
│  │          │          │          │   ┌──────────────────┐  │     │
│  │• List    │• Explore │• About   │   │ ○ Text ● Email   │  │     │
│  │• How to  │• Stories │• Team    │   │ [____________]   │  │     │
│  │• Legal   │• Agent   │• Careers │   │ [Share now]      │  │     │
│  │• Guaran. │• FAQ     │• Blog    │   │                  │  │     │
│  │          │          │          │   │ Import listing   │  │     │
│  │          │          │[Emergency]  │   [____________]   │  │     │
│  └──────────┴──────────┴──────────┴─────────────────────────┘     │
│                                                                      │
│  Made with love in NYC            © 2025 SplitLease                │
└─────────────────────────────────────────────────────────────────────┘
```

### Tablet View (768-900px)

```
┌──────────────────────────────────────────┐
│            HEADER (Simplified)            │
│  Logo  Split Lease   [Explore] [Sign In] │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│            Contents (Full Width)          │
│  • Background Check                       │
│  • Cancellation and Refund                │
│  • Community Guidelines                   │
│  (All policies listed)                    │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│    Cancellation and Refund Policy  [↓]   │
│                                           │
│  ┌──────────────────────────────────┐   │
│  │       PDF VIEWER                  │   │
│  │                                   │   │
│  │   (Embedded PDF - smaller)        │   │
│  │                                   │   │
│  └──────────────────────────────────┘   │
└──────────────────────────────────────────┘

            ↓ Back to Top ↓

┌──────────────────────────────────────────┐
│        FOOTER (2 Column Grid)             │
│  ┌────────────┬────────────┐            │
│  │ For Hosts  │ For Guests │            │
│  └────────────┴────────────┘            │
│  ┌────────────┬────────────┐            │
│  │  Company   │   Refer    │            │
│  └────────────┴────────────┘            │
└──────────────────────────────────────────┘
```

### Mobile View (<768px)

```
┌────────────────────────┐
│   HEADER (Compact)     │
│  Logo    [≡] [Sign In] │
└────────────────────────┘

┌────────────────────────┐
│      Contents          │
│  • Background...       │
│  • Cancellation...     │
│  • Community...        │
└────────────────────────┘

┌────────────────────────┐
│ Cancellation Policy    │
│ [↓ Download]           │
│                        │
│ ┌────────────────────┐ │
│ │   PDF VIEWER       │ │
│ │   (Mobile size)    │ │
│ │                    │ │
│ └────────────────────┘ │
└────────────────────────┘

       ↓ Back to Top ↓

┌────────────────────────┐
│   FOOTER (Stacked)     │
│   • For Hosts          │
│   • For Guests         │
│   • Company            │
│   • Refer              │
└────────────────────────┘
```

---

## 🎨 Color Scheme

### Header
```
Background: Linear gradient
  From: #2E1A47 (Deep Purple)
  To:   #4A2B6B (Purple)

Text: White (#FFFFFF)
Buttons: White background with purple text
```

### Main Content
```
Background: Light Gray (#F8F9FA)

Sidebar:
  Background: White
  Text: Gray (#868E96)
  Active: Purple (#4A2B6B)
  Border: Light Gray (#E6E6E6)

Content Area:
  Background: White
  Title: Black (#000000)
  Border: Light Gray (#E6E6E6)
```

### Footer
```
Background: Linear gradient (Same as header)
  From: #2E1A47
  To:   #4A2B6B

Text: White with 80% opacity
Links: White on hover

Emergency Button: Red (#EF4444)
Action Buttons: Blue (#6366F1)
```

---

## 📐 Spacing & Measurements

### Header
- Height: 70px
- Logo: 40x40px
- Padding: 40px horizontal
- Button padding: 12px × 24px

### Content Wrapper
- Max width: 1400px (70% of viewport)
- Gap: 40px between sidebar and content
- Top margin: 70px (header height)
- Padding: 40px vertical

### Sidebar
- Width: 25% of container
- Padding: 30px
- Border radius: 8px
- Sticky offset: 100px from top

### Main Content
- Width: 70% of container
- Padding: 40px
- Border radius: 8px

### PDF Viewer
- Width: 95% of content area
- Height: 1000px (desktop)
- Height: 600px (mobile)
- Border radius: 8px

### Footer
- Padding: 60px × 40px
- Grid: 4 columns (desktop)
- Grid: 2 columns (tablet)
- Grid: 1 column (mobile)

---

## 🔤 Typography

### Headings
```
Page Title (H1):
  Font size: 36px
  Font weight: 700 (Bold)
  Color: Black (#000000)
  Line height: 1.3

Sidebar Title (H2):
  Font size: 24px
  Font weight: 700 (Bold)
  Color: Black (#000000)
  Border bottom: 2px solid #DEDEDE

Footer Headings (H3):
  Font size: 20px
  Font weight: 700 (Bold)
  Color: White
```

### Body Text
```
Navigation Items:
  Font size: 18px
  Letter spacing: -1px
  Line height: 1.4
  Color: Gray (#868E96)
  Active color: Purple (#4A2B6B)

Footer Links:
  Font size: 16px
  Color: White (80% opacity)
  Hover: White (100% opacity)
```

---

## 🖱️ Interactive Elements

### Navigation Items
```
Default State:
  Color: Gray (#868E96)
  No underline
  Padding: 12.5px vertical

Hover State:
  Color: Purple (#4A2B6B)
  Smooth transition (500ms)

Active State:
  Color: Purple (#4A2B6B)
  Font weight: 600 (Semi-bold)
  Underline
```

### Buttons

#### Primary Button (Explore Rentals)
```
Background: White
Text: Purple (#4A2B6B)
Border radius: 8px
Padding: 12px × 24px

Hover: Scale up 1.05
```

#### Secondary Button (Sign In/Up)
```
Background: Transparent
Border: 1px solid white
Color: White
Border radius: 8px
Padding: 10px × 20px

Hover: Semi-transparent white background
```

#### Emergency Button
```
Background: Red (#EF4444)
Color: White
Border radius: 8px
Padding: 14px × 28px
Width: 100%

Hover: Darker red (#DC2626)
```

#### Action Buttons (Share/Submit)
```
Background: Blue (#6366F1)
Color: White
Border radius: 6px
Padding: 12px × 24px
Width: 100%

Hover: Darker blue (#4F46E5)
```

### Back to Top Button
```
Position: Centered
Background: Transparent
Color: Purple (#4A2B6B)
Font size: 24px
Padding: 20px

Hover: Moves up 5px
Transition: Transform 0.3s
```

---

## 📊 Visual Hierarchy

### Z-Index Layers
```
Layer 5: Header (z-index: 1000)
Layer 4: Back to top button (z-index: 100)
Layer 3: Sticky sidebar (position: sticky)
Layer 2: Content (z-index: 1)
Layer 1: Footer (z-index: 0)
```

### Visual Weight
```
Highest:
  - Page title (36px, bold)
  - Header navigation

High:
  - Sidebar title (24px, bold)
  - Footer headings (20px, bold)

Medium:
  - Navigation items (18px)
  - Body text (16px)
  - Buttons

Low:
  - Footer text (14px)
  - Metadata
```

---

## 🎭 Component States

### Sidebar Navigation

**Default:**
```
┌────────────────────┐
│ Contents           │
│                    │
│ Background Check   │  ← Gray text
│ Cancellation...    │  ← Gray text, underlined (active)
│ Community Guide    │  ← Gray text
└────────────────────┘
```

**Hover:**
```
┌────────────────────┐
│ Contents           │
│                    │
│ Background Check   │  ← Purple text (hovered)
│ Cancellation...    │  ← Purple text, underlined
│ Community Guide    │  ← Gray text
└────────────────────┘
```

### PDF Viewer

**Loading:**
```
┌─────────────────────────────┐
│                             │
│      Loading PDF...         │
│                             │
└─────────────────────────────┘
```

**Loaded:**
```
┌─────────────────────────────┐
│  Policy Document Content    │
│  ┌─────────────────────┐   │
│  │ [PDF Page 1]        │   │
│  │                     │   │
│  │ Text content...     │   │
│  └─────────────────────┘   │
│  Scroll to see more ↓       │
└─────────────────────────────┘
```

**Error:**
```
┌─────────────────────────────┐
│                             │
│  ⚠️ Error loading PDF        │
│  Please try again           │
│                             │
└─────────────────────────────┘
```

---

## 🌈 Visual Effects

### Gradients
```
Header/Footer Gradient:
  linear-gradient(135deg, #2E1A47 0%, #4A2B6B 100%)
  Direction: Top-left to bottom-right
  Smooth transition between purples
```

### Shadows
```
Header/Footer:
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)

Cards (Sidebar, Content):
  border: 1px solid #E6E6E6
  No shadow (flat design)

Buttons on hover:
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
```

### Transitions
```
Fast (0.2s):
  - Button hovers
  - Color changes
  - Opacity changes

Medium (0.3s):
  - Transform effects
  - Smooth scrolling

Slow (0.5s):
  - Navigation color changes
  - Complex animations
```

---

## 📐 Responsive Behavior

### Desktop (>900px)
- Sidebar and content side-by-side
- 25% / 70% split
- Sticky sidebar scrolling
- Full header with all navigation
- 4-column footer

### Tablet (768-900px)
- Stacked layout
- Sidebar full width at top
- Content full width below
- Simplified header
- 2-column footer

### Mobile (<768px)
- Full width stacked
- Simplified navigation
- Smaller text sizes
- 1-column footer
- Reduced padding/spacing

---

## 🎯 Design Principles

1. **Clean & Modern**
   - Flat design with minimal shadows
   - Ample white space
   - Clear visual hierarchy

2. **Professional**
   - Consistent spacing
   - Balanced proportions
   - Professional color palette

3. **Accessible**
   - High contrast text
   - Large touch targets (min 44px)
   - Keyboard navigable

4. **Responsive**
   - Mobile-first approach
   - Fluid layouts
   - Adaptive content

5. **Fast**
   - Optimized assets
   - Minimal dependencies
   - Lazy loading PDFs

---

## 🖼️ Component Showcase

### Header Component
```
┌─────────────────────────────────────────────────────┐
│ [Logo] Split Lease   Host▼  Stay▼  [Explore] [Sign]│
└─────────────────────────────────────────────────────┘
  Purple gradient background, white text, 70px tall
```

### Sidebar Component
```
┌──────────────────┐
│ Contents         │  ← Bold, 24px
│ ─────────────── │  ← 2px border
│                  │
│ Background...    │  ← 18px, gray
│ Cancellation...  │  ← 18px, purple, underlined
│ Community...     │  ← 18px, gray
│ Cookie...        │  ← 18px, gray
│ (more items)     │
└──────────────────┘
  White background, rounded corners, sticky position
```

### Content Header Component
```
┌─────────────────────────────────────────────────────┐
│  Cancellation and Refund Policy           [↓]      │
└─────────────────────────────────────────────────────┘
     36px bold title, centered, download icon right
```

### PDF Viewer Component
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │                                               │ │
│  │         [PDF Document Embedded]               │ │
│  │                                               │ │
│  │         Scrollable Content Area               │ │
│  │                                               │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
   95% width, 1000px height, rounded corners, border
```

### Back to Top Component
```
           ↑
    Back to Top

  Purple text, centered, 24px
  Hovers: moves up 5px
```

### Footer Component
```
┌─────────────────────────────────────────────────────┐
│ ┌──────────┬──────────┬──────────┬──────────────┐  │
│ │For Hosts │For Guests│ Company  │  Refer Form  │  │
│ │          │          │          │              │  │
│ │• Item 1  │• Item 1  │• Item 1  │ Radio opts   │  │
│ │• Item 2  │• Item 2  │• Item 2  │ Input field  │  │
│ │• Item 3  │• Item 3  │• Item 3  │ [Button]     │  │
│ │          │          │[Red Btn] │              │  │
│ └──────────┴──────────┴──────────┴──────────────┘  │
│                                                     │
│ Made with love in NYC        © 2025 SplitLease     │
└─────────────────────────────────────────────────────┘
  Purple gradient, white text, 4-column grid
```

---

## ✨ Animation Examples

### Page Load
1. Header fades in from top
2. Sidebar slides in from left
3. Content fades in
4. Footer slides up from bottom

### Navigation Click
1. Remove underline from previous active
2. Add underline to new active (smooth)
3. Change color from gray to purple (500ms)
4. Scroll PDF into view (smooth)
5. Update page title (instant)

### Scroll Effects
1. Sticky sidebar remains visible
2. Back to top appears after 300px scroll
3. Smooth scrolling for all anchors

---

## 📱 Real-World Examples

### Desktop Screenshot Representation
```
┌───────────────────────────────────────────────────────┐
│ [Logo] Split Lease   Host▼   Stay▼   [Explore] [Sign]│ ← Purple header
├─────────────┬────────────────────────────────────────┤
│             │                                        │
│ Contents    │  Cancellation and Refund Policy  [↓]  │
│             │                                        │
│ Background  │ ╔════════════════════════════════════╗│
│ Cancella... │ ║                                    ║│
│ Community   │ ║   CANCELLATION AND REFUND POLICY   ║│
│ Cookie      │ ║                                    ║│
│ Fees        │ ║   Last Updated: January 15, 2024   ║│
│ Host Guar   │ ║                                    ║│
│ Host Terms  │ ║   1. Overview                      ║│
│ Payments    │ ║   This policy outlines...          ║│
│ Privacy     │ ║                                    ║│
│ Terms       │ ║   2. Cancellation Types            ║│
│             │ ║   - Full refund...                 ║│
│             │ ║   - Partial refund...              ║│
│ Sidebar:    │ ║   - No refund...                   ║│
│ 300px wide  │ ║                                    ║│
│ White bg    │ ║   [More PDF content...]            ║│
│ Sticky      │ ║                                    ║│
│             │ ╚════════════════════════════════════╝│
│             │                                        │
├─────────────┴────────────────────────────────────────┤
│                    ↑ Back to Top ↑                    │
├──────────────────────────────────────────────────────┤
│  For Hosts  │  For Guests  │  Company  │  Refer      │ ← Purple footer
└──────────────────────────────────────────────────────┘
```

---

## 🎨 Style Guide Summary

### Do's ✅
- Use CSS custom properties for consistency
- Maintain 8px spacing grid
- Keep animations subtle and smooth
- Use semantic HTML elements
- Ensure high contrast for readability
- Test on real devices

### Don'ts ❌
- Don't use inline styles
- Don't mix spacing units (use rem/px consistently)
- Don't add animations longer than 500ms
- Don't use absolute positioning unless necessary
- Don't forget mobile breakpoints
- Don't skip accessibility attributes

---

**This visual guide complements the actual implementation. Refer to the CSS files for exact values and the HTML file for structure.** 🎨
