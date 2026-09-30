# Design System Specification

## Project: QiCraft - Static & Private QR Studio
**Version:** 1.0.0  
**Design Reference:** Google Stitch Project `10964595585475877541`  

---

## 1. Visual Language & Principles

The QiCraft design system embodies a modern, technical, and high-trust aesthetic. It merges the sleekness of contemporary developer tools with the precision of print engineering.

- **High Trust & Cryptographic Cleanliness:** Visual cues (verified badges, zero telemetry indicators, crisp vector geometry) reassure users of data privacy.
- **Visual Depth & Layering:** Deep atmospheric dark backgrounds paired with subtle surface elevation and delicate 1px borders (`#334155`).
- **Harmonious Accents:** Primary Indigo (`#6366F1`) paired with verification Emerald (`#10B981`) for optimal feedback signaling.

---

## 2. Color Tokens

### 2.1 Dark Mode Palette (Default)

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `color-bg-base` | `#0B1326` | Deep navy-black canvas background |
| `color-surface-card` | `#171F33` | Primary container & accordion card background |
| `color-surface-hover` | `#222A3D` | Interactive card hover state |
| `color-surface-active` | `#2D3449` | Selected state for chips and segmented buttons |
| `color-border-subtle` | `#334155` | 1px card and input dividing borders |
| `color-border-focus` | `#6366F1` | Active focus ring on inputs and controls |
| `color-primary` | `#6366F1` | Primary brand action color (Buttons, active icons) |
| `color-primary-hover` | `#4F46E5` | Hover state for primary buttons |
| `color-secondary` | `#10B981` | Success, verified telemetry, optimal contrast badge |
| `color-text-primary` | `#F8FAFC` | Primary headings and prominent body text |
| `color-text-secondary`| `#94A3B8` | Helper labels, captions, and muted icons |
| `color-warning` | `#F59E0B` | Warning badge (e.g. moderate contrast) |
| `color-danger` | `#EF4444` | Critical alerts (unscannable contrast ratio) |

### 2.2 Light Mode Palette (Alternative)

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `color-bg-light` | `#F8FAFC` | Clean neutral white/slate canvas |
| `color-surface-light` | `#FFFFFF` | Card surface with soft ambient shadow |
| `color-border-light` | `#E2E8F0` | Subtle grey dividing border |
| `color-text-light-pri`| `#0F172A` | High-contrast dark typography |
| `color-text-light-sec`| `#64748B` | Secondary captions and labels |

---

## 3. Typography Tokens

- **Font Family:** `Inter`, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif.

| Style Name | Font Size | Line Height | Weight | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| `display-xl` | 36px (2.25rem) | 44px | 700 (Bold) | -0.02em |
| `heading-lg` | 24px (1.5rem) | 32px | 600 (SemiBold) | -0.015em |
| `heading-md` | 18px (1.125rem)| 26px | 600 (SemiBold) | -0.01em |
| `body-lg` | 16px (1rem) | 24px | 400 (Regular) | 0 |
| `body-md` | 14px (0.875rem)| 20px | 400 (Regular) | 0 |
| `label-sm` | 12px (0.75rem) | 16px | 600 (SemiBold) | 0.04em |
| `code-mono` | 12px (0.75rem) | 16px | 500 (Medium) | 0 |

---

## 4. Spacing & Corner Radii

### 4.1 Spacing Scale
- `space-xs`: 4px (0.25rem)
- `space-sm`: 8px (0.5rem)
- `space-md`: 16px (1rem)
- `space-lg`: 24px (1.5rem)
- `space-xl`: 32px (2rem)
- `space-2xl`: 48px (3rem)

### 4.2 Corner Radii
- `radius-sm`: 6px (Inputs, color swatches, small badges)
- `radius-md`: 8px (Buttons, dropdowns, segmented controls)
- `radius-lg`: 16px (Accordion cards, preview container frame)
- `radius-xl`: 24px (Modals, floating sheets, preview canvas)

---

## 5. Elevation & Shadow Levels

- **Elevation 0 (Canvas):** Flat base, no shadow.
- **Elevation 1 (Cards & Controls):**  
  `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2);`
- **Elevation 2 (Floating Preview & Active Headers):**  
  `box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3);`
- **Elevation 3 (Dropdowns & Modals):**  
  `box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);`

---

## 6. Core Component Guidelines

### 6.1 Accordion Panels
- Header: `#171F33` with 1px `#334155` border. On hover, shifts to `#222A3D`.
- Expanded State: Left indicator border in `#6366F1` (3px width) with smooth chevron rotation.
- Content Padding: 20px internal padding with standardized 16px vertical gap between controls.

### 6.2 Scannability Verification Pill
- **Optimal Contrast:** Background `rgba(16, 185, 129, 0.15)`, Border `#10B981`, Text `#10B981`, pulsing emerald dot indicator.
- **Fair Contrast:** Background `rgba(245, 158, 11, 0.15)`, Border `#F59E0B`, Text `#F59E0B`.
- **Poor / Unscannable:** Background `rgba(239, 68, 68, 0.15)`, Border `#EF4444`, Text `#EF4444`.

### 6.3 Segmented Shape Selectors
- Outer Container: Rounded pill/box in `#0B1326` with 4px padding.
- Item: Rounded 6px, smooth 150ms background transition.
- Active Segment: Surface `#2D3449` with bright white icon and text.
