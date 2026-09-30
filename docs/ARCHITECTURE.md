# Technical Architecture & SOLID Implementation

## Project: QiCraft - Static & Private QR Studio
**Version:** 1.0.0  
**Target:** Client-Side Single Page Application (React + Vite + TypeScript)  

---

## 1. Architectural Overview

QiCraft adopts Clean Architecture principles adapted for client-side web applications. Domain logic (QR generation, payload formatting, scannability math, print calculations) is kept pure, isolated from framework-specific rendering code, and 100% testable without a DOM environment.

```
┌────────────────────────────────────────────────────────┐
│                      UI Layer                          │
│  React Components, Tailwind CSS, Lucide Icons, i18n   │
└──────────────────────────┬─────────────────────────────┘
                           │ Dispatches actions / hooks
┌──────────────────────────▼─────────────────────────────┐
│                 State Management Layer                 │
│         Zustand Stores (useQRStore, useUIStore)        │
└──────────────────────────┬─────────────────────────────┘
                           │ Invokes pure domain services
┌──────────────────────────▼─────────────────────────────┐
│                   Domain Core Layer                    │
│   Encoders │ QRRenderer Facade │ Scannability │ DPI     │
└──────────────────────────┬─────────────────────────────┘
                           │ Wraps low-level library
┌──────────────────────────▼─────────────────────────────┐
│               Infrastructure / Third-Party             │
│        qr-code-styling │ colord │ HTML5 Canvas / Blob  │
└────────────────────────────────────────────────────────┘
```

---

## 2. SOLID Principles in Practice

### 2.1 Single Responsibility Principle (SRP)
- **`src/core/encoders/`**: Each encoder has only one reason to change: changes in that specific standard format (e.g. WiFi specification or vCard standard).
- **`src/core/scannability/contrastChecker.ts`**: Pure mathematical calculations for relative luminance and contrast ratio according to the WCAG 2.1 formula:
  $$\text{Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$
- **`src/core/dpi/printCalculator.ts`**: Converts pixels and DPI to metric (centimeters) and imperial (inches) dimensions without touching any UI or rendering logic.

### 2.2 Open/Closed Principle (OCP)
The payload encoding system is designed to be open for extension and closed for modification via the `IPayloadEncoder` interface:

```typescript
export interface IPayloadEncoder<T> {
  readonly type: string;
  encode(payload: T): string;
  validate(payload: T): { isValid: boolean; error?: string };
}
```
Adding new QR types (e.g., Geo-location, Crypto Address, Calendar Event) requires creating a new encoder class without modifying existing encoder implementations.

### 2.3 Liskov Substitution Principle (LSP)
Exporters adhere to a shared contract `IQRঙ্কExporter`:

```typescript
export interface IQRExporter {
  export(options: ExportOptions): Promise<Blob | string>;
}
```
Both `RasterExporter` (generating high-resolution PNGs with DPI metadata) and `SvgExporter` (generating pure SVG vectors) can be substituted seamlessly by callers.

### 2.4 Interface Segregation Principle (ISP)
Client components only depend on specific, segregated interfaces:
- `IQRStyleOptions` (dots, corners, eyes, colors, gradient)
- `IQRLogoOptions` (image, size, halo)
- `IQRPrintOptions` (pixelWidth, pixelHeight, dpi)

### 2.5 Dependency Inversion Principle (DIP)
React components never instantiate third-party `qr-code-styling` directly. Instead, they interact via the `IQRRenderer` facade interface. If the underlying rendering library needs to be replaced or augmented with a custom WebGL/Canvas renderer in the future, only the adapter implementation changes.

---

## 3. Pixel & DPI Calculation Engine

The DPI engine bridges digital pixels with physical real-world print dimensions.

1. **Resolution Dimensions:** Standard export widths range from 256px to 8192px.
2. **DPI Standards:**
   - `72 DPI`: Standard screen and digital media display.
   - `150 DPI`: Fast newspaper or medium-distance signage.
   - `300 DPI`: Industry standard for high-quality commercial offset and digital print (brochures, business cards, table tents).
   - `600 DPI`: Ultra-fine art and micro-barcode printing.
3. **Mathematical Formulas:**
   $$\text{Dimension (inches)} = \frac{\text{Pixels}}{\text{DPI}}$$
   $$\text{Dimension (cm)} = \frac{\text{Pixels}}{\text{DPI}} \times 2.54$$

---

## 4. Internationalization (i18n) Architecture

The application uses a lightweight, type-safe dictionary approach:
- Complete key parity between `src/i18n/en.ts` and `src/i18n/id.ts`.
- TypeScript enforces compile-time verification: missing translation keys in either language cause immediate type errors.
- Persistent state saved to `localStorage` under `qicraft_locale`.
