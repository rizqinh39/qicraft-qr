# QiCraft Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build QiCraft, a 100% client-side, zero-telemetry static QR code generator studio with customizable geometries, colors, logo overlays, DPI/pixel print controls, bilingual localization (EN/ID), template gallery, and educational landing.

**Architecture:** Clean Architecture with pure domain logic (payload encoders, contrast/scannability checking, DPI print calculations, QR rendering facade) strictly decoupled from the React UI. Global state is managed via Zustand, styled with Tailwind CSS according to the QiCraft Design System tokens, and verified by Vitest unit tests.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, `qr-code-styling`, `zustand`, `colord`, `lucide-react`, `canvas-confetti`, Vitest.

## Global Constraints
- Target Framework: React 19 + TypeScript + Vite
- Brand Name: QiCraft (Unified across all titles, copy, and metadata)
- Zero Telemetry: No network calls for QR computation or tracking
- Languages: Bilingual English (EN) and Bahasa Indonesia (ID) with persistent `localStorage`
- Color Palette: Base `#0B1326`, Surface `#171F33`, Border `#334155`, Primary `#6366F1`, Secondary `#10B981`
- Testing: Vitest for pure domain logic and utilities

---

### Task 1: Project Scaffolding, Dependencies & Design System Tokens

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Test: `tests/setup.ts`

**Interfaces:**
- Produces: Working development server setup, Tailwind CSS token classes matching `DESIGN_SYSTEM.md`, and Vitest test runner configuration.

- [ ] **Step 1: Write `package.json` with scripts and dependencies**

```json
{
  "name": "qicraft-qr",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "canvas-confetti": "^1.9.4",
    "clsx": "^2.1.1",
    "colord": "^2.9.3",
    "lucide-react": "^1.16.0",
    "qr-code-styling": "^1.8.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^3.0.2",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^22.13.10",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.3",
    "tailwindcss": "^3.4.17",
    "typescript": "~5.7.3",
    "vite": "^6.2.0",
    "vitest": "^3.0.7"
  }
}
```

- [ ] **Step 2: Write `vite.config.ts`, `tsconfig.json`, and `tsconfig.node.json`**

`vite.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
  },
});
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "tests"]
}
```

`tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 3: Write `tailwind.config.js` and `postcss.config.js` with Design Tokens**

`postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

`tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-base': '#0B1326',
        'surface-card': '#171F33',
        'surface-hover': '#222A3D',
        'surface-active': '#2D3449',
        'border-subtle': '#334155',
        'border-focus': '#6366F1',
        primary: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          light: '#C0C1FF',
        },
        secondary: {
          DEFAULT: '#10B981',
          container: '#00A572',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Create `index.html`, `src/index.css`, `src/main.tsx`, and `tests/setup.ts`**

`index.html`:
```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>QiCraft — Static & Private QR Code Studio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-bg-base text-slate-100 font-sans antialiased min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0b1326;
  color: #f8fafc;
}
```

`src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`src/App.tsx`:
```tsx
export default function App() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-primary">QiCraft QR Studio</h1>
    </div>
  );
}
```

`tests/setup.ts`:
```typescript
// Test setup file for vitest
```

- [ ] **Step 5: Install dependencies and verify build & test setup**

Run: `npm install && npm run build && npx vitest run`  
Expected: Clean build and vitest initialized.

- [ ] **Step 6: Commit**

```bash
git add package.json vite.config.ts tsconfig*.json tailwind.config.js postcss.config.js index.html src/ tests/
git commit -m "chore: scaffold vite react ts project with tailwind design tokens"
```

---

### Task 2: Core Domain Encoders (TDD)

**Files:**
- Create: `src/core/encoders/types.ts`
- Create: `src/core/encoders/urlEncoder.ts`
- Create: `src/core/encoders/wifiEncoder.ts`
- Create: `src/core/encoders/vcardEncoder.ts`
- Create: `src/core/encoders/smsEncoder.ts`
- Test: `tests/core/encoders.test.ts`

**Interfaces:**
- Produces: Type-safe serializers and validators for URL (with UTM), Wi-Fi, vCard 4.0, Plain Text, and SMS payloads.
```typescript
export interface IPayloadEncoder<T> {
  readonly type: string;
  encode(payload: T): string;
  validate(payload: T): { isValid: boolean; error?: string };
}
```

- [ ] **Step 1: Write failing tests in `tests/core/encoders.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { UrlEncoder } from '../../src/core/encoders/urlEncoder';
import { WifiEncoder } from '../../src/core/encoders/wifiEncoder';
import { VCardEncoder } from '../../src/core/encoders/vcardEncoder';
import { SmsEncoder } from '../../src/core/encoders/smsEncoder';

describe('Payload Encoders', () => {
  it('encodes URL with UTM parameters properly', () => {
    const encoder = new UrlEncoder();
    const result = encoder.encode({
      baseUrl: 'https://example.com',
      utmSource: 'newsletter',
      utmMedium: 'email',
      utmCampaign: 'launch2026',
    });
    expect(result).toBe('https://example.com/?utm_source=newsletter&utm_medium=email&utm_campaign=launch2026');
  });

  it('encodes Wi-Fi format according to standard', () => {
    const encoder = new WifiEncoder();
    const result = encoder.encode({
      ssid: 'QiCraft-WiFi',
      password: 'secretPassword123',
      encryption: 'WPA',
      hidden: false,
    });
    expect(result).toBe('WIFI:T:WPA;S:QiCraft-WiFi;P:secretPassword123;H:false;;');
  });

  it('encodes vCard 4.0 standard format', () => {
    const encoder = new VCardEncoder();
    const result = encoder.encode({
      firstName: 'Rizqi',
      lastName: 'Nur',
      organization: 'Tech Labs',
      jobTitle: 'Architect',
      phone: '+62812345678',
      email: 'rizqi@example.com',
      website: 'https://qicraft.io',
      address: 'Jakarta, Indonesia',
    });
    expect(result).toContain('BEGIN:VCARD');
    expect(result).toContain('VERSION:4.0');
    expect(result).toContain('FN:Rizqi Nur');
    expect(result).toContain('ORG:Tech Labs');
    expect(result).toContain('END:VCARD');
  });

  it('encodes SMS format according to standard', () => {
    const encoder = new SmsEncoder();
    const result = encoder.encode({
      phone: '+62812345678',
      message: 'Hello from QiCraft',
    });
    expect(result).toBe('SMSTO:+62812345678:Hello from QiCraft');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/core/encoders.test.ts`  
Expected: FAIL (modules not found)

- [ ] **Step 3: Implement `types.ts`, `urlEncoder.ts`, `wifiEncoder.ts`, `vcardEncoder.ts`, `smsEncoder.ts`**

Implement complete serialization logic in `src/core/encoders/`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/core/encoders.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/encoders/ tests/core/encoders.test.ts
git commit -m "feat(core): implement domain payload encoders for url, wifi, vcard, and sms"
```

---

### Task 3: Core Scannability & Contrast Calculator (TDD)

**Files:**
- Create: `src/core/scannability/contrastChecker.ts`
- Create: `src/core/scannability/validator.ts`
- Create: `src/core/scannability/types.ts`
- Test: `tests/core/scannability.test.ts`

**Interfaces:**
- Produces: WCAG 2.1 relative luminance and contrast ratio evaluator returning scannability status (`optimal`, `acceptable`, `critical`).

- [ ] **Step 1: Write failing tests in `tests/core/scannability.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { calculateContrastRatio, evaluateScannability } from '../../src/core/scannability/contrastChecker';

describe('Scannability & Contrast Engine', () => {
  it('calculates optimal contrast for black on white', () => {
    const ratio = calculateContrastRatio('#000000', '#FFFFFF');
    expect(ratio).toBeCloseTo(21, 0);
    const status = evaluateScannability(ratio);
    expect(status.level).toBe('optimal');
  });

  it('identifies critical unscannable contrast for very close colors', () => {
    const ratio = calculateContrastRatio('#1E293B', '#0F172A');
    expect(ratio).toBeLessThan(2.0);
    const status = evaluateScannability(ratio);
    expect(status.level).toBe('critical');
    expect(status.isScannable).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/core/scannability.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement `contrastChecker.ts` using `colord` luminance algorithms**

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/core/scannability.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/scannability/ tests/core/scannability.test.ts
git commit -m "feat(core): implement WCAG contrast calculation and scannability evaluation"
```

---

### Task 4: Core DPI & Print Dimension Calculator (TDD)

**Files:**
- Create: `src/core/dpi/printCalculator.ts`
- Create: `src/core/dpi/types.ts`
- Test: `tests/core/dpi.test.ts`

**Interfaces:**
- Produces: Mathematical converter between digital pixels, physical DPI, centimeters, and inches:
```typescript
export interface IPrintDimension {
  pixels: number;
  dpi: number;
  cm: number;
  inches: number;
}
export function calculatePrintDimensions(pixels: number, dpi: number): IPrintDimension;
```

- [ ] **Step 1: Write failing tests in `tests/core/dpi.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { calculatePrintDimensions, PRESET_DIMENSIONS } from '../../src/core/dpi/printCalculator';

describe('DPI & Print Dimension Calculator', () => {
  it('accurately calculates physical dimensions for 1200px at 300 DPI', () => {
    const result = calculatePrintDimensions(1200, 300);
    expect(result.inches).toBe(4);
    expect(result.cm).toBeCloseTo(10.16, 2);
  });

  it('provides correct default presets for web and print', () => {
    expect(PRESET_DIMENSIONS.webStandard.pixels).toBe(1024);
    expect(PRESET_DIMENSIONS.webStandard.dpi).toBe(72);
    expect(PRESET_DIMENSIONS.printBrochure.pixels).toBe(1200);
    expect(PRESET_DIMENSIONS.printBrochure.dpi).toBe(300);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/core/dpi.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement `printCalculator.ts`**

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/core/dpi.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/dpi/ tests/core/dpi.test.ts
git commit -m "feat(core): implement DPI and physical print dimension converter"
```

---

### Task 5: QR Rendering Engine & Safety Guard Facade (TDD)

**Files:**
- Create: `src/core/qr/types.ts`
- Create: `src/core/qr/safetyGuard.ts`
- Create: `src/core/qr/QRRenderer.ts`
- Test: `tests/core/safetyGuard.test.ts`

**Interfaces:**
- Produces: `safetyGuard.ts` which forces Reed-Solomon Error Correction to at least Level Q or H when a logo is attached, and `QRRenderer.ts` facade for generating SVG/Canvas instances with `qr-code-styling`.

- [ ] **Step 1: Write failing tests in `tests/core/safetyGuard.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { resolveErrorCorrectionLevel } from '../../src/core/qr/safetyGuard';

describe('QR Safety Guard', () => {
  it('retains user error correction when no logo is attached', () => {
    const level = resolveErrorCorrectionLevel('L', false);
    expect(level).toBe('L');
  });

  it('elevates error correction to Q or H when logo is attached', () => {
    expect(resolveErrorCorrectionLevel('L', true)).toBe('Q');
    expect(resolveErrorCorrectionLevel('M', true)).toBe('Q');
    expect(resolveErrorCorrectionLevel('H', true)).toBe('H');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/core/safetyGuard.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement `safetyGuard.ts` and `QRRenderer.ts`**

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/core/safetyGuard.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/qr/ tests/core/safetyGuard.test.ts
git commit -m "feat(core): implement QR safety guard and QRRenderer facade"
```

---

### Task 6: Internationalization (i18n) Engine & Zustand State Store

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/en.ts`
- Create: `src/i18n/id.ts`
- Create: `src/i18n/index.ts`
- Create: `src/store/useQRStore.ts`
- Create: `src/store/useUIStore.ts`
- Test: `tests/i18n/i18n.test.ts`

**Interfaces:**
- Produces: Type-safe bilingual dictionary hook `useTranslation()` and global stores `useQRStore` (for QR configuration) and `useUIStore` (for active tab, language, theme).

- [ ] **Step 1: Write failing tests in `tests/i18n/i18n.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { en } from '../../src/i18n/en';
import { id } from '../../src/i18n/id';

describe('i18n Localization Integrity', () => {
  it('has identical keys for both English and Indonesian translations', () => {
    const enKeys = Object.keys(en).sort();
    const idKeys = Object.keys(id).sort();
    expect(enKeys).toEqual(idKeys);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/i18n/i18n.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement comprehensive dictionaries in `en.ts` and `id.ts`, translation helper, and Zustand stores**

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/i18n/i18n.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/i18n/ src/store/ tests/i18n/i18n.test.ts
git commit -m "feat(i18n, store): implement bilingual dictionary and zustand application state"
```

---

### Task 7: UI Layout, Navigation & Header Components

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/LanguageToggle.tsx`
- Create: `src/components/layout/ThemeToggle.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`

**Interfaces:**
- Produces: Header with navigation tabs (*Studio*, *Templates*, *How It Works*), Language toggle (EN/ID), Reset Defaults button, and Zero Telemetry verification pill.

- [ ] **Step 1: Implement `Navbar.tsx` with logo, view switcher, and language toggle**
- [ ] **Step 2: Implement `Footer.tsx` with trust badges and privacy notice**
- [ ] **Step 3: Mount Layout in `App.tsx` and verify rendering with `npm run build`**
- [ ] **Step 4: Commit**

```bash
git add src/components/layout/ src/components/ui/ src/App.tsx
git commit -m "feat(ui): implement navbar, footer, language toggle, and core atomic components"
```

---

### Task 8: Studio Payload Inputs (URL+UTM, WiFi, vCard 4.0, Plain Text, SMS)

**Files:**
- Create: `src/components/studio/PayloadTabs.tsx`
- Create: `src/components/studio/UrlInputPanel.tsx`
- Create: `src/components/studio/WifiInputPanel.tsx`
- Create: `src/components/studio/VCardInputPanel.tsx`
- Create: `src/components/studio/TextInputPanel.tsx`
- Create: `src/components/studio/SmsInputPanel.tsx`

**Interfaces:**
- Produces: Modular input forms for each payload type bound to `useQRStore`, updating the encoded raw string in real time.

- [ ] **Step 1: Implement `PayloadTabs.tsx` with icons for URL, Wi-Fi, vCard, Text, SMS**
- [ ] **Step 2: Implement `UrlInputPanel.tsx` with collapsible UTM campaign builder**
- [ ] **Step 3: Implement `WifiInputPanel.tsx` with WPA/WEP/Open options and hidden SSID toggle**
- [ ] **Step 4: Implement `VCardInputPanel.tsx` with full professional contact fields**
- [ ] **Step 5: Implement `TextInputPanel.tsx` and `SmsInputPanel.tsx`**
- [ ] **Step 6: Build verification and Commit**

```bash
git add src/components/studio/
git commit -m "feat(studio): implement modular payload input panels for url, wifi, vcard, text, sms"
```

---

### Task 9: Studio Customization Panels (Colors, Geometry, Logo, Reed-Solomon, Resolution/DPI)

**Files:**
- Create: `src/components/studio/Accordion.tsx`
- Create: `src/components/studio/ColorsPanel.tsx`
- Create: `src/components/studio/GeometryPanel.tsx`
- Create: `src/components/studio/LogoPanel.tsx`
- Create: `src/components/studio/ReedSolomonPanel.tsx`
- Create: `src/components/studio/ResolutionPanel.tsx`

**Interfaces:**
- Produces: Accordion control panels for all aesthetic and export parameters:
  - Colors: Foreground, Background, Dual-Tone Gradient, Transparent toggle, Contrast ratio pill.
  - Geometry: Body dots (square, dots, rounded, diamond), Eye frame (square, rounded, leaf), Center pupil (square, circle).
  - Logo: File upload with DataURL preview, Protective Halo toggle, Logo size slider.
  - Reed-Solomon: Error correction (L, M, Q, H with auto-lock), Quiet Zone margin slider.
  - Resolution & DPI: Preset buttons, custom px & DPI inputs, and live physical size display (cm/inch).

- [ ] **Step 1: Implement `ColorsPanel.tsx` with gradient builder and contrast checking**
- [ ] **Step 2: Implement `GeometryPanel.tsx` with visual segmented icon buttons**
- [ ] **Step 3: Implement `LogoPanel.tsx` with drag-and-drop file upload and protective halo**
- [ ] **Step 4: Implement `ReedSolomonPanel.tsx` with safety elevation indicators**
- [ ] **Step 5: Implement `ResolutionPanel.tsx` with presets and real-time cm/inch dimension calculation**
- [ ] **Step 6: Build verification and Commit**

```bash
git add src/components/studio/
git commit -m "feat(studio): implement styling accordion panels for colors, geometry, logo, reed-solomon, and dpi"
```

---

### Task 10: Live Sticky Preview Viewport & Multi-Format Export Pipeline

**Files:**
- Create: `src/components/preview/PreviewCanvas.tsx`
- Create: `src/components/preview/ScannabilityBadge.tsx`
- Create: `src/components/preview/ExportControls.tsx`
- Create: `src/core/export/rasterExporter.ts`
- Create: `src/core/export/svgExporter.ts`
- Create: `src/core/export/clipboardHelper.ts`

**Interfaces:**
- Produces: Real-time sticky preview canvas on desktop, optical scannability indicator, high-res PNG download (with custom pixel dimensions), vector SVG download, and Copy Image to Clipboard action.

- [ ] **Step 1: Implement `PreviewCanvas.tsx` wrapping `qr-code-styling` DOM mount**
- [ ] **Step 2: Implement `ScannabilityBadge.tsx` displaying real-time WCAG rating**
- [ ] **Step 3: Implement `rasterExporter.ts` generating PNG at specified resolution with DPI metadata**
- [ ] **Step 4: Implement `svgExporter.ts` and `clipboardHelper.ts` with confetti celebration feedback**
- [ ] **Step 5: Build verification and Commit**

```bash
git add src/components/preview/ src/core/export/
git commit -m "feat(preview): implement live sticky preview viewport and multi-format export pipeline"
```

---

### Task 11: Templates Gallery View

**Files:**
- Create: `src/data/templates.ts`
- Create: `src/components/templates/TemplateCard.tsx`
- Create: `src/components/templates/TemplatesGallery.tsx`

**Interfaces:**
- Produces: 6 pre-designed templates (*Minimalist Cafe*, *Executive vCard*, *Guest Wi-Fi*, *Packaging Serial*, *App Store*, *Crypto Cold Wallet*). Clicking "Use Template" loads configuration into `useQRStore` and navigates back to Studio.

- [ ] **Step 1: Define template parameters and presets in `templates.ts`**
- [ ] **Step 2: Implement `TemplateCard.tsx` with live preview and tag badges**
- [ ] **Step 3: Implement `TemplatesGallery.tsx` grid and "Apply to Studio" action**
- [ ] **Step 4: Build verification and Commit**

```bash
git add src/data/templates.ts src/components/templates/
git commit -m "feat(templates): implement curated templates gallery with one-click studio apply"
```

---

### Task 12: How It Works & Educational Landing View

**Files:**
- Create: `src/components/how-it-works/PipelineDiagram.tsx`
- Create: `src/components/how-it-works/ComparisonTable.tsx`
- Create: `src/components/how-it-works/FaqAccordion.tsx`
- Create: `src/components/how-it-works/HowItWorksView.tsx`

**Interfaces:**
- Produces: Interactive educational page detailing the 4-step mathematical pipeline, static vs dynamic QR trap comparison table, and technical FAQ.

- [ ] **Step 1: Implement `PipelineDiagram.tsx` (Direct Encoding -> Reed-Solomon -> Matrix Synthesis -> Optical Scan)**
- [ ] **Step 2: Implement `ComparisonTable.tsx` comparing QiCraft Static vs Commercial Dynamic QR**
- [ ] **Step 3: Implement `FaqAccordion.tsx` and assemble in `HowItWorksView.tsx`**
- [ ] **Step 4: Build verification and Commit**

```bash
git add src/components/how-it-works/
git commit -m "feat(how-it-works): implement educational landing with pipeline diagram, comparison table, and FAQ"
```

---

### Task 13: Responsive Mobile Drawer, End-to-End Polish & Verification

**Files:**
- Create: `src/components/preview/MobilePreviewDrawer.tsx`
- Modify: `src/App.tsx`
- Test: `tests/e2e/workflow.test.ts`

**Interfaces:**
- Produces: Floating bottom drawer for mobile preview, smooth view transitions, and full verification test suite.

- [ ] **Step 1: Implement `MobilePreviewDrawer.tsx` allowing mobile users to toggle live preview without scrolling**
- [ ] **Step 2: Assemble full application in `App.tsx` connecting Studio, Templates, and How It Works views**
- [ ] **Step 3: Run full Vitest test suite**

Run: `npm test`  
Expected: All tests pass.

- [ ] **Step 4: Run production build check**

Run: `npm run build`  
Expected: Clean build with zero TypeScript or packaging errors.

- [ ] **Step 5: Commit**

```bash
git add src/ tests/
git commit -m "feat: complete QiCraft static QR studio with mobile drawer and full verification"
```
