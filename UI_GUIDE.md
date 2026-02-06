# Cyber-DNA UI Complete Guide

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🛡️ CYBER-DNA      [Active • Status]    Alex Morgan          │
│     Personal Digital Twin              alex@example.com      │
└─────────────────────────────────────────────────────────────┘

┌──────────┬──────────┬──────────┬──────────┐
│   RISK   │ ANOMALY  │ ACTIVITY │PROTECTED │
│  MEDIUM  │    8     │   242    │   234    │
└──────────┴──────────┴──────────┴──────────┘

┌─────────────────────────────────┬──────────────────────┐
│                                 │                      │
│  SECURITY ALERTS (3)            │  SECURITY STATS      │
│  ❌ Phishing (CRITICAL)         │  Protection: 92%     │
│  ⚠️  Unusual Login (HIGH)       │  Blocked: 12         │
│  ⚠️  Large Transaction (MED)    │  Uptime: 99.9%       │
│                                 │                      │
│  ACTIVITY TIMELINE              │  DIGITAL TWIN        │
│  🔐 Login - SF                  │  🗺️  Locations       │
│  💳 Transaction - SF            │  ⏰ Hours 9-6        │
│  📊 Data Access - Home          │  📱 Devices          │
│                                 │                      │
│  THREAT SCENARIOS               │                      │
│  ▶️ Unusual Login               │                      │
│  ▶️ Large Transaction           │                      │
│  ▶️ Phishing Attempt            │                      │
│  ▶️ Data Access Anomaly         │                      │
│                                 │                      │
└─────────────────────────────────┴──────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🔐 Cyber-DNA Protection Active                             │
│  Your digital twin monitors 24/7 with end-to-end encryption │
└─────────────────────────────────────────────────────────────┘
```

---

## Color Reference

### Theme Colors

```css
Primary Color: Purple (#A78BFA)
- Used for: Buttons, main highlights, icons
- RGB: 167, 139, 250
- OKLCH: 0.58 0.28 282

Accent Color: Cyan (#22D3EE)
- Used for: Secondary highlights, accents
- RGB: 34, 211, 238
- OKLCH: 0.62 0.32 192

Background: Near Black (#0F172A)
- Used for: Page background
- RGB: 15, 23, 42
- OKLCH: 0.08 0 0

Card: Dark Gray (#1E293B)
- Used for: Components, sections
- RGB: 30, 41, 59
- OKLCH: 0.13 0 0

Foreground: Near White (#F8F9FA)
- Used for: Text, content
- RGB: 248, 249, 250
- OKLCH: 0.98 0 0
```

### Alert Colors

```
CRITICAL (Red):
- Border: #DC2626
- Background: rgba(220, 38, 38, 0.1)
- Text: #DC2626

HIGH (Orange):
- Border: #EA580C
- Background: rgba(234, 88, 12, 0.1)
- Text: #EA580C

MEDIUM (Yellow):
- Border: #CA8A04
- Background: rgba(202, 138, 4, 0.1)
- Text: #CA8A04

LOW (Blue):
- Border: #3B82F6
- Background: rgba(59, 130, 246, 0.1)
- Text: #3B82F6
```

### Success/Status Colors

```
Success: #10B981 (Green)
Warning: #F59E0B (Amber)
Error: #EF4444 (Red)
Info: #06B6D4 (Cyan)
```

---

## Component Sizes

### Header
- Height: 80px (py-4)
- Padding: 24px (px-6)
- Gap between items: 12px

### Stat Cards
- Height: Auto (min 120px)
- Padding: 20px
- Grid: 1col mobile, 2col tablet, 4col desktop
- Gap: 16px

### Alert Items
- Padding: 16px
- Border-left: 4px
- Gap between elements: 12px

### Activity Items
- Padding: 16px
- Border-left: 4px
- Gap between elements: 12px

### Scenario Buttons
- Padding: 16px
- Min-height: 80px
- Full width
- Gap: 12px

---

## Typography

### Headings
```
Page Title: 28px bold (text-2xl)
Section Heading: 20px bold (text-xl)
Card Title: 18px bold (text-lg)
Label: 14px medium (text-sm font-medium)
Caption: 12px regular (text-xs)
```

### Body Text
```
Primary: 14px (text-sm)
Secondary: 12px (text-xs)
Muted: 12px gray (text-muted-foreground)
```

### Font Family
```
Sans: Geist or system sans-serif
Font weights used:
- Regular (400)
- Medium (500)
- Semibold (600)
- Bold (700)
```

---

## Spacing System

```
Padding:
- 4px   = p-1
- 8px   = p-2
- 12px  = p-3
- 16px  = p-4
- 20px  = p-5
- 24px  = p-6
- 32px  = p-8

Margin:
- 4px   = m-1
- 8px   = m-2
- 12px  = m-3
- 16px  = m-4
- 20px  = m-5
- 24px  = m-6

Gap:
- 8px   = gap-2
- 12px  = gap-3
- 16px  = gap-4
- 20px  = gap-5
- 24px  = gap-6
```

---

## Border & Radius

```
Border Radius:
- Default: 10px (rounded-lg)
- Large: 12px (rounded-xl)
- Full: 9999px (rounded-full)

Border Style:
- 1px solid color
- Opacity: border-border/50
- Hover: border-primary/30

Border Colors:
- Default: border-border/50
- Hover: border-primary/30, border-accent/30
```

---

## Animations

```
Fade In: opacity-0 → opacity-100
Slide Up: translate-y-4 → translate-y-0
Pulse: animate-pulse (opacity 0.5-1)
Spin: animate-spin (360deg rotation)
Scale: hover:scale-110
Blur: backdrop-blur-sm, backdrop-blur-xl

Transitions:
- Duration: 150ms-300ms
- Easing: ease-in-out
- Properties: all, colors, opacity
```

---

## Interactive States

### Buttons
```
Default:
- bg-primary
- text-primary-foreground
- rounded-md

Hover:
- bg-primary/90
- cursor-pointer
- transform: scale-105

Active:
- bg-primary/80
- ring: 2px ring-offset-2

Disabled:
- opacity-50
- cursor-not-allowed
- pointer-events: none
```

### Cards
```
Default:
- border: 1px border-border/50
- bg: bg-secondary/50

Hover:
- border: border-primary/30
- shadow: subtle
- transform: none

Active:
- border: border-primary
- bg: bg-secondary/60
```

### Alerts
```
Dismissible:
- X button on right
- Opacity: 100% → 0% (on dismiss)
- Remove from DOM

Clickable:
- cursor: pointer
- hover: scale-102
- transition: 150ms
```

---

## Responsive Breakpoints

```
Mobile: 0px - 640px
  - Single column layout
  - Full-width cards
  - Larger touch targets

Tablet: 641px - 1024px
  - 2-column grid
  - Adjusted padding
  - Medium text

Desktop: 1025px+
  - 3-column main layout
  - Full sidebar
  - Optimized spacing
```

---

## Dark Mode

All components use CSS variables:

```css
:root {
  --background: oklch(0.08 0 0);
  --foreground: oklch(0.98 0 0);
  --primary: oklch(0.58 0.28 282);
  --accent: oklch(0.62 0.32 192);
  --card: oklch(0.13 0 0);
  --muted: oklch(0.25 0 0);
  --border: oklch(0.2 0 0);
}

/* Applied with class="dark" on html */
```

---

## Icon Reference

```
Shield        → Header logo, protection
AlertTriangle → Warnings, risk indicators
Activity      → Activities, monitoring
TrendingUp    → Statistics, metrics
Lock          → Security, protection
Zap           → Power, active state
Brain         → AI, digital twin
MapPin        → Location data
Clock         → Time data
X             → Close, dismiss

All icons: 16-24px, Lucide React
```

---

## Accessibility

```
Color Contrast:
- Text on background: 7:1+
- All text readable

Keyboard Navigation:
- Tab order: logical
- Focus visible: ring-2
- Buttons: clickable

Screen Readers:
- Semantic HTML
- ARIA labels where needed
- Icon descriptions

Touch Targets:
- Min 44x44px
- Enough spacing between

Reduced Motion:
- Respects prefers-reduced-motion
```

---

## Performance Metrics

```
Page Load: < 1s
First Paint: < 500ms
Time to Interactive: < 2s
Cumulative Layout Shift: < 0.1
Largest Contentful Paint: < 2.5s

Bundle Size:
- HTML: ~30KB
- CSS: ~20KB
- JS: ~100KB
- Images: ~0KB
Total: ~150KB
```

---

## Testing Checklist

- [ ] Page loads instantly
- [ ] All alerts display
- [ ] Timeline shows activities
- [ ] Threat scenarios clickable
- [ ] Alerts can be dismissed
- [ ] Colors render correctly
- [ ] Icons display properly
- [ ] Text is readable
- [ ] Responsive on mobile
- [ ] Hover effects work
- [ ] Animations smooth
- [ ] No layout shifts
- [ ] Fast performance
- [ ] Keyboard navigation
- [ ] Screen reader friendly

---

## Component States

### Alert Item
```
- Default: border-l-4, padding-4
- Hover: bg-secondary/30 → bg-secondary/50
- Active: ring-1 ring-primary
- Dismissed: fade-out, removed
```

### Activity Item
```
- Default: border-l-4 border-primary
- Hover: bg-secondary/30 → bg-secondary/50
- Click: no action (display only)
```

### Threat Button
```
- Default: rounded-lg, border-border/50
- Hover: bg-secondary/60, border-primary/50
- Active: loading state with animation
- Disabled: opacity-50, cursor-not-allowed
```

---

## Quick Reference

### Copy-Paste Colors
```
Primary:     #A78BFA
Accent:      #22D3EE
Background:  #0F172A
Card:        #1E293B
Text:        #F8F9FA
Error:       #DC2626
Success:     #10B981
Warning:     #F59E0B
```

### Copy-Paste Shadows
```
sm: 0 1px 2px rgba(0,0,0,0.05)
md: 0 4px 6px rgba(0,0,0,0.1)
lg: 0 10px 15px rgba(0,0,0,0.1)
```

---

**Complete UI specifications for Cyber-DNA dashboard. Ready for production use.** ✅
