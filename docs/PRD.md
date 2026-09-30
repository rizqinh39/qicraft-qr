# Product Requirements Document (PRD)

## Project: QiCraft - Static & Private QR Studio
**Document Version:** 1.0.0  
**Date:** 2026-09-30  
**Status:** Approved  
**Author:** Pair Programming Agent & Team  

---

## 1. Introduction & Background

### 1.1 Problem Statement
Many online QR code generators use a deceptive business model: they encode a proprietary shortened URL that redirects to the user's destination. After a brief trial period, these dynamic QR services demand steep recurring monthly fees. If the user does not pay, the redirect link is disabled, rendering physical business cards, restaurant menus, product labels, and signage useless. Furthermore, these intermediary redirect servers log user IP addresses, scan locations, timestamps, and device telemetry without explicit consent.

### 1.2 The QiCraft Solution
QiCraft is a 100% client-side, zero-telemetry static QR generator studio. All QR matrix computation, styling, and rendering occur entirely in the user's browser. The destination URL or payload is encoded directly into the QR pattern itself.
- **Never Expires:** No intermediary server to shut down.
- **Unlimited Scans:** Direct optical scanning forever.
- **Complete Privacy:** Zero server analytics, zero cookies, zero tracking.
- **Production-Grade Print Ready:** Configurable pixel dimensions and physical DPI (dots per inch) with automatic conversion to metric (cm) and imperial (inches) units for graphic designers and commercial print shops.

---

## 2. User Personas

| Persona | Needs & Goals | Pain Points with Existing Solutions |
| :--- | :--- | :--- |
| **Graphic Designer & Print Agency** | High-resolution vector SVG or 300+ DPI PNG exports for posters, packaging, and business cards with exact physical dimensions. | Existing generators export low-res raster images with watermarks or charge subscriptions for SVGs. |
| **Small Business Owner / Cafe Manager** | Generate permanent menu and Wi-Fi QR codes without worrying about expiry dates or monthly subscriptions. | Fear of menus becoming inaccessible when a subscription lapses; complicated sign-up processes. |
| **Privacy-Conscious Professional** | Share digital vCard 4.0 contact information and confidential network credentials without leaking data to cloud databases. | Third-party services collecting contact lists and Wi-Fi passwords on their cloud backends. |
| **Non-Technical User** | Simple, intuitive interface with pre-built templates and safe defaults to create aesthetic QR codes quickly. | Overwhelming jargon (Reed-Solomon, quiet zone, error correction levels) without clear guidance. |

---

## 3. Product Scope & Functional Requirements

### 3.1 Data Payload Encoders (Feature Category F1)
- **F1.1 Website URL:**
  - Input field with standard protocol validation (`https://` or `http://`).
  - Integrated UTM Campaign Builder: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`.
  - Automatic URL concatenation with query parameters.
- **F1.2 Direct Wi-Fi Access:**
  - Network SSID input.
  - Password input with toggleable visibility.
  - Encryption type selection: `WPA/WPA2/WPA3` (default), `WEP`, `None (Open)`.
  - Hidden SSID checkbox.
  - Serialized format: `WIFI:T:<encryption>;S:<ssid>;P:<password>;H:<hidden>;;`.
- **F1.3 vCard 4.0 Digital Contact Card:**
  - Fields: First Name, Last Name, Organization, Job Title, Mobile Phone, Work Phone, Email, Website, Street Address, City, Country.
  - Serialized standard vCard 4.0 string format.
- **F1.4 Plain Text:**
  - Multi-line text input with character count monitor.
- **F1.5 SMS / Direct Message:**
  - Recipient phone number and pre-filled message text.
  - Serialized format: `SMSTO:<number>:<message>`.

### 3.2 Visual Customization Engine (Feature Category F2)
- **F2.1 Color & Gradient Studio:**
  - Foreground color picker (Hex, RGB) and custom palette presets.
  - Background color picker and Transparent Background toggle.
  - Dual-Tone Linear Gradient: Start color, End color, Angle slider ($0^\circ$ to $360^\circ$).
- **F2.2 Geometry & Dot Matrix Shapes:**
  - Body Dot Styles: Standard Crisp Square, Rounded Dots, Soft Rectangles, Diamond modules.
  - Eye Corner Frame: Square border, Rounded border, Leaf-style border.
  - Eye Center Pupil: Square pupil, Circular pupil.
- **F2.3 Brand Logo Integration:**
  - Client-side image upload (PNG, JPG, SVG, WebP) with FileReader conversion to DataURL.
  - Protective Halo: Opaque background halo behind the logo to prevent scanning interference.
  - Logo Scale Slider: Bounds between 10% and 35% of total QR dimension.
- **F2.4 Error Correction & Margins:**
  - Reed-Solomon levels: L (7%), M (15%), Q (25%), H (30%).
  - Quiet Zone margin slider (0 to 4 modules).
  - Safety Guard: Automatically forces minimum Level Q or H when a logo is attached.

### 3.3 Resolution, Pixel & DPI Engine (Feature Category F3)
- **F3.1 Pre-configured Dimension Presets:**
  - *Digital Web & Social:* 1024 × 1024 px @ 72 DPI (Default).
  - *Retina & 4K Display:* 2048 × 2048 px @ 72 DPI.
  - *Small Print (Menus, Flyers, Cards):* 1200 × 1200 px @ 300 DPI (~10.16 × 10.16 cm).
  - *Standard Print (Posters, Banners):* 2400 × 2400 px @ 300 DPI (~20.32 × 20.32 cm).
  - *Billboard & Large Format:* 4096 × 4096 px @ 300 DPI (~34.69 × 34.69 cm).
- **F3.2 Custom Dimension Configuration:**
  - Pixel dimensions input (256px to 8192px).
  - Target DPI selection: 72 DPI (Web), 150 DPI (Draft Print), 300 DPI (Commercial Print), 600 DPI (Ultra Fine).
  - Real-time Physical Dimension Calculation:
    $$\text{Width (cm)} = \left(\frac{\text{Pixel Width}}{\text{DPI}}\right) \times 2.54$$
    $$\text{Width (inches)} = \frac{\text{Pixel Width}}{\text{DPI}}$$

### 3.4 Export Pipeline (Feature Category F4)
- **F4.1 Vector SVG Export:** Generates clean, resolution-independent vector markup for scalable printing.
- **F4.2 Raster PNG Export:** Generates crisp PNG raster images at the specified pixel size and attaches standard pHYs/resolution metadata for 300 DPI printing.
- **F4.3 Direct Clipboard Copy:** Copies the generated PNG image directly to the system clipboard for immediate pasting into graphic software.

### 3.5 Templates Gallery & How It Works (Feature Category F5)
- **F5.1 Curated Presets:** 6 industry-standard templates with instant "Apply to Studio" actions.
- **F5.2 Educational Landing:** 4-step pipeline explanation, comparative analysis against dynamic QR traps, and technical FAQ.

### 3.6 Internationalization & Accessibility (Feature Category F6)
- **F6.1 Language Switcher:** Instant switching between English (EN) and Bahasa Indonesia (ID) with persistent state.
- **F6.2 Dark / Light Theme:** Default dark mode with responsive high-contrast light mode alternative.
- **F6.3 Contrast Guard:** Dynamic WCAG 2.1 contrast calculation with visual scannability badges.

---

## 4. Non-Functional Requirements (NFR)

1. **Security & Privacy:**
   - Zero outbound telemetry or API requests for QR computation.
   - All uploaded logos are processed in memory and never transmitted to any remote storage.
2. **Performance:**
   - Real-time preview re-render latency under 50ms upon input modification.
   - Initial page load time under 1.5s on standard broadband.
3. **Compatibility:**
   - Fully compatible with modern evergreen browsers (Chrome, Safari, Firefox, Edge).
   - Generates standard ISO/IEC 18004 QR codes scannable by native iOS Camera, Android Camera/Google Lens, and industrial barcode scanners.
4. **Offline Capability:**
   - Progressive Web App (PWA) manifest ready for complete offline operation.

---

## 5. Acceptance Criteria

1. **Static Verification:** QR code scanned with a disconnected smartphone (airplane mode) must directly open/read the encoded data without pinging a third-party server.
2. **Logo Safety:** Attaching a custom logo automatically elevates error correction to at least Level Q and maintains reliable scannability.
3. **DPI Output:** A 300 DPI 1200px export accurately renders at $10.16 \times 10.16$ cm when imported into print layout software (e.g. Adobe InDesign, Illustrator).
4. **Language Toggle:** Switching from EN to ID seamlessly updates all interface labels, tooltips, validation messages, and templates without resetting user input.
