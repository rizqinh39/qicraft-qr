# Design Specification: QiCraft - Static & Private QR Studio

- **Status:** Approved
- **Date:** 2026-09-30
- **Project Title:** QiCraft
- **Source Stitch Project ID:** `10964595585475877541`

---

## 1. Executive Summary

QiCraft is a client-side, zero-telemetry static QR code generator studio. Unlike traditional commercial QR generators that wrap URLs in redirect domains (which frequently break, require subscription renewals, and track personal data), QiCraft directly encodes user data into pure static QR codes. 

The application runs 100% in the user's browser, guarantees that codes never expire, supports unlimited scans offline, and provides professional export capabilities (SVG vector, PNG at custom pixel and DPI resolutions for high-definition print and digital usage). It features bilingual support (English and Bahasa Indonesia) and an intelligent safety engine for contrast and scannability.

---

## 2. Core Value Propositions & Privacy Guarantees

1. **Pure Static Encoding:** Direct encoding of payloads (URLs, Wi-Fi credentials, vCard 4.0 contact data, Plain Text, SMS) into the QR matrix without intermediary tracking proxies or shortened URLs.
2. **Zero Telemetry & 100% Client-Side:** No server requests, no analytics trackers, no cloud database storage. Safe for confidential Wi-Fi credentials and private personal contacts.
3. **Never Expiring & Unlimited Scans:** QR codes remain optically scannable forever as long as the printed medium or image exists.
4. **Professional Print Ready:** Pixel and DPI configuration (72, 150, 300, 600 DPI) with real-time physical print dimension estimation in centimeters and inches ($$\text{cm} = \frac{\text{Pixel}}{\text{DPI}} \times 2.54$$).
5. **Real-Time Scannability & Contrast Engine:** Continuous WCAG 2.1 contrast calculation with proactive warnings against unscannable color palettes and automatic Reed-Solomon error correction elevation upon logo upload.

---

## 3. System Architecture & SOLID Principles

The system follows Clean Architecture principles, ensuring that UI components, domain logic, and external rendering libraries are strictly decoupled.

### 3.1 Modular Decomposition

```
src/
├── core/                         # Domain Logic (Zero UI dependencies)
│   ├── qr/                       # QR Generation & Styling Adapter
│   │   ├── QRRenderer.ts         # Facade wrapping qr-code-styling
│   │   ├── safetyGuard.ts        # Reed-Solomon auto-elevation logic
│   │   └── types.ts              # QR domain types
│   ├── scannability/             # Contrast & optical verification
│   │   ├── contrastChecker.ts    # WCAG 2.1 luminance calculation
│   │   └── validator.ts          # Score & status calculation (Optimal/Warning/Critical)
│   ├── encoders/                 # Payload serializers
│   │   ├── urlEncoder.ts         # URL + UTM parameters serializer
│   │   ├── wifiEncoder.ts        # WiFi payload (WIFI:T:..;S:..;P:..;H:..;;)
│   │   ├── vcardEncoder.ts       # Standard vCard 4.0 serializer
│   │   └── smsEncoder.ts         # SMS / Chat URI serializer
│   ├── export/                   # Rendering & export pipeline
│   │   ├── rasterExporter.ts     # Multi-resolution PNG generator with DPI
│   │   ├── svgExporter.ts        # Clean vector SVG generator
│   │   └── clipboardHelper.ts    # Direct copy-to-clipboard handler
│   └── dpi/
│       └── printCalculator.ts    # Pixel/DPI to physical print dimension converter
├── store/                        # State Management (Zustand)
│   ├── useQRStore.ts             # QR configuration, active template, history
│   └── useUIStore.ts             # Active view (studio/templates/how-it-works), locale, theme
├── i18n/                         # Internationalization
│   ├── en.ts                     # English dictionary
│   ├── id.ts                     # Indonesian dictionary
│   └── index.ts                  # Type-safe translation hook
├── components/                   # React UI Components
│   ├── layout/                   # Header, Navigation, Footer, LangToggle, ThemeToggle
│   ├── studio/                   # Configuration panels (Accordion, TypeTabs, ColorPicker, etc.)
│   ├── preview/                  # Live preview viewport, scannability badge, quick actions
│   ├── templates/                # Template gallery grid, category filters, apply handler
│   ├── how-it-works/             # Interactive 4-step pipeline, comparison matrix, FAQ
│   └── ui/                       # Reusable primitives (Buttons, Sliders, Accordions, Modals)
└── types/                        # Global TypeScript type definitions
```

### 3.2 SOLID Adherence
- **Single Responsibility Principle (SRP):** Each encoder (e.g. `wifiEncoder.ts`) handles solely the serialization of its specific data format. The `contrastChecker.ts` handles solely luminance and ratio math without awareness of DOM elements.
- **Open/Closed Principle (OCP):** New input types (e.g., Crypto Wallet, Event Calendar) can be introduced by creating a new encoder implementing the `IPayloadEncoder` interface without altering existing encoders.
- **Liskov Substitution Principle (LSP):** Any exporter implements a unified `IExporter` interface delivering a standardized blob/string output.
- **Interface Segregation Principle (ISP):** Components only subscribe to the specific slice of Zustand state they render.
- **Dependency Inversion Principle (DIP):** UI components communicate with the QR rendering engine through an abstraction facade (`QRRenderer`) rather than binding directly to third-party library primitives.

---

## 4. User Interface & Feature Specifications

### 4.1 Studio Generator View
- **Header:** Brand logo, navigation tabs (*Studio*, *Templates*, *How It Works*), Language toggle (EN / ID), Dark/Light mode toggle, Reset Defaults button, and a "Zero Telemetry" badge.
- **Payload Selector Tabs:**
  1. *Website URL:* Base URL input + collapsible UTM Builder (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`).
  2. *Wi-Fi Access:* Network SSID, Password, Encryption (WPA/WPA2, WEP, None), and Hidden Network toggle.
  3. *vCard 4.0:* Full Name, Organization, Job Title, Mobile Phone, Work Phone, Email, Website, Address.
  4. *Plain Text:* Multiline text area with live character counter.
  5. *SMS / Message:* Recipient Phone Number and default message body.
- **Styling Accordion Modules:**
  1. *Colors & Contrast Engine:*
     - Foreground Color Picker & Hex Input.
     - Background Color Picker & Hex Input.
     - Dual-Tone Linear Gradient Toggle (Start Color, End Color, Gradient Angle: 0° to 360°).
     - Transparent Background Toggle.
     - Curated high-contrast color swatches.
     - Real-time Contrast Ratio display with WCAG indicator.
  2. *Module Shapes & Eye Geometry:*
     - Body Dots: Standard Square, Rounded Dots, Soft Rectangles, Diamond.
     - Corner Square Frame: Square, Rounded, Leaf.
     - Center Corner Pupil: Square, Circle.
  3. *Logo & Brand Emblem:*
     - File uploader (PNG, JPG, SVG, WebP).
     - Protective Halo toggle (adds an opaque circular/rounded white backing behind the logo).
     - Logo Scale Slider (10% to 35% of total QR size).
  4. *Reed-Solomon & Margin (Quiet Zone):*
     - Error Correction Levels: L (7%), M (15%), Q (25%), H (30%).
     - Automatic lock to Q or H when a logo is active.
     - Quiet Zone Margin Slider (0 to 4 modules).
  5. *Resolution & Print Settings:*
     - Quick Presets: Web Standard (1024px @ 72 DPI), HD Screen (2048px @ 72 DPI), Print Brochure (1200px @ 300 DPI), Print Poster (2400px @ 300 DPI), Billboard Print (4096px @ 300 DPI).
     - Custom Controls: Width/Height (256px to 8192px), DPI Selector (72, 150, 300, 600).
     - Real-Time Physical Print Size Badge: Displays output size in `cm` and `inches`.
- **Live Sticky Preview Canvas:**
  - Instant vector/canvas preview rendering with smooth transitions.
  - Optical Scannability Badge: "Optimal Contrast", "Acceptable", or "Critical: Low Contrast".
  - One-click Quick Actions: Download High-Res PNG, Download Vector SVG, Copy Image to Clipboard.

### 4.2 Templates Gallery View
Presents curated presets categorized by real-world use case:
1. *Minimalist Cafe & Bistro Menu* (Leaf eye frames, warm obsidian tones, high margin).
2. *Executive Tech vCard 4.0* (Indigo linear gradient, rounded dots, modern aesthetic).
3. *Zero-Friction Guest Wi-Fi* (Vibrant emerald accent, circular pupils, bold framing).
4. *Product Packaging & Batch Serial* (Crisp square dots, maximum error correction H, high contrast).
5. *Dual App Store Landing* (Soft smooth modules, branded royal blue gradient).
6. *Crypto Wallet Cold Receive* (Diamond geometry, high contrast mono, safety quiet zone).
Each card includes a live thumbnail, description, tag, and an "Apply to Studio" button that navigates directly to the Studio with all parameters preloaded.

### 4.3 How It Works & Educational Landing View
1. *The 4-Step Mathematical Pipeline:* Visual explanation of Direct Data Encoding -> Reed-Solomon Parity Protection -> Vector Matrix Synthesis -> Offline Scannability.
2. *Bypassing the URL Shortener Trap:* Contrast between commercial dynamic QR paywalls (broken links upon subscription lapse) versus permanent, cryptographically pure static QR codes.
3. *Comparison Matrix:* QiCraft Static vs. Commercial Dynamic QR (Cost, Data Privacy, Expiration, Scan Speed, Offline Functionality).
4. *Technical FAQ:* Clarifying misconceptions regarding QR capacity, error correction mathematics, and scanner compatibility.

---

## 5. Bilingual Localization (i18n)

Every user-facing string is managed through a typed translation dictionary:
- Full English (EN) and Bahasa Indonesia (ID) coverage.
- Domain terms translated contextually (e.g. *Quiet Zone* -> *Margin Pengaman (Quiet Zone)*, *Error Correction* -> *Koreksi Kesalahan Reed-Solomon*).
- Language toggle located prominently in the navigation bar.

---

## 6. Verification & Quality Gates

- **Unit & Logic Testing:** Encoders (URL, WiFi, vCard, SMS), contrast calculation mathematical correctness, physical print dimension formulas.
- **Scannability Validation:** Tested against real mobile scanners (Apple Camera iOS, Google Lens Android, standard QR scanner apps).
- **Responsive Layout:** Mobile sticky preview drawer, fluid desktop two-column workspace.
- **Zero Telemetry Audit:** Verified zero outbound network telemetry calls via DevTools Network inspection.
