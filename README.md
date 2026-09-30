# QiCraft — Static & Private QR Code Studio

> **100% Client-Side, Zero Telemetry, Never Expiring Static QR Code Generator.**  
> Crafted with precision for designers, businesses, and privacy-conscious users.

---

## 🌟 Key Features

- **🛡️ 100% Private & Zero Telemetry:** Pure client-side computation. No cloud databases, no analytics pinging, no link shorteners, and no hidden subscriptions.
- **♾️ Permanent & Never Expiring:** Encodes data directly into standard ISO/IEC 18004 QR matrices. Works offline forever with unlimited scans.
- **🎨 Advanced Geometric Customization:**
  - Body module dot styles: Standard crisp, Rounded dots, Smooth rectangles, and Diamond.
  - Corner eye frame curvature: Square, Rounded, and Organic Leaf.
  - Center pupil shapes: Square and Circle.
  - Linear dual-tone gradients with customizable angles ($0^\circ$ to $360^\circ$).
  - Custom logo upload with an intelligent protective white background halo.
- **📐 Print-Ready Pixel & DPI Studio:**
  - Export at high-resolution pixel dimensions (up to 4096px+).
  - Configurable physical DPI settings (72, 150, 300, 600 DPI).
  - Real-time conversion to physical print dimensions in **centimeters (cm)** and **inches**.
  - Vector SVG export for infinite scaling in print prepress (Adobe Illustrator, InDesign, Figma).
- **⚡ Smart Scannability & Error Guard:**
  - Continuous WCAG 2.1 contrast calculation with live status indicators.
  - Automatic error correction level elevation (Reed-Solomon Level Q/H) when logos are embedded.
- **🌐 Bilingual Support:** Instant toggle between **English (EN)** and **Bahasa Indonesia (ID)** with persistent user preferences.
- **📋 Ready-to-Use Templates:** Pre-designed templates for Cafe Menus, vCard 4.0, Guest Wi-Fi, Packaging, and more.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + CSS Design Tokens
- **QR Rendering Core:** `qr-code-styling`
- **State Management:** Zustand
- **Color & Contrast:** `colord`
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm / pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/qicraft-qr.git

# Navigate to project folder
cd qicraft-qr

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📖 Documentation

- **[Product Requirements Document (PRD)](file:///docs/PRD.md)**
- **[Design System Specification](file:///docs/DESIGN_SYSTEM.md)**
- **[Technical Architecture & SOLID Patterns](file:///docs/ARCHITECTURE.md)**
- **[Full Design Spec](file:///docs/superpowers/specs/2026-09-30-qicraft-design.md)**

---

## 📄 License
MIT License. Created with ❤️ for private, open, and permanent digital infrastructure.
