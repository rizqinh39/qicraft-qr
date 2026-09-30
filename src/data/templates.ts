import { IQRConfig } from '../core/qr/types';
import { PayloadType } from '../store/useQRStore';
import { DpiPresetKey } from '../core/dpi/printCalculator';

export interface ITemplatePreset {
  id: string;
  categoryEn: string;
  categoryId: string;
  titleEn: string;
  titleId: string;
  descriptionEn: string;
  descriptionId: string;
  tags: string[];
  payloadType: PayloadType;
  defaultPayload: any;
  recommendedPreset: DpiPresetKey;
  config: Partial<IQRConfig>;
}

export const TEMPLATES_DATA: ITemplatePreset[] = [
  {
    id: 'cafe-bistro-menu',
    categoryEn: 'Hospitality & Dining',
    categoryId: 'Restoran & Kafe',
    titleEn: 'Minimalist Cafe & Bistro Menu',
    titleId: 'Buku Menu Kafe & Bistro Minimalis',
    descriptionEn: 'Calibrated for tabletop displays, acrylic stands, and ambient cafe lighting with organic leaf geometry.',
    descriptionId: 'Dikalibrasi untuk display meja, akrilik, dan pencahayaan kafe dengan lekukan sudut bergaya daun alami.',
    tags: ['Tabletop', 'Print-Ready', 'Organic Leaf'],
    payloadType: 'url',
    defaultPayload: { baseUrl: 'https://qicraft.io/demo/menu' },
    recommendedPreset: 'printBrochure',
    config: {
      data: 'https://qicraft.io/demo/menu',
      margin: 3,
      errorCorrectionLevel: 'M',
      style: {
        dotsType: 'rounded',
        dotsColor: '#0F172A',
        backgroundColor: '#FFFFFF',
        cornerSquareType: 'dot',
        cornerSquareColor: '#0F172A',
        cornerDotType: 'dot',
        cornerDotColor: '#0F172A',
      },
    },
  },
  {
    id: 'executive-tech-vcard',
    categoryEn: 'Networking & Identity',
    categoryId: 'Kartu Nama Digital',
    titleEn: 'Executive Tech vCard 4.0',
    titleId: 'Kartu Nama Eksekutif vCard 4.0',
    descriptionEn: 'Dual-tone gradient matrix with smooth corner arcs, ideal for embossed business cards and badge lanyards.',
    descriptionId: 'Gradasi dua warna modern dengan sudut halus, sangat pas untuk kartu nama timbul dan ID card lanyard.',
    tags: ['vCard 4.0', 'Gradient', 'Networking'],
    payloadType: 'vcard',
    defaultPayload: {
      firstName: 'Alex',
      lastName: 'Vance',
      organization: 'QiCraft Labs',
      jobTitle: 'Principal Engineer',
      phone: '+1 (555) 019-2834',
      email: 'alex@qicraft.io',
      website: 'https://qicraft.io',
    },
    recommendedPreset: 'printBrochure',
    config: {
      data: 'BEGIN:VCARD\nVERSION:4.0\nFN:Alex Vance\nN:Vance;Alex;;;\nORG:QiCraft Labs\nTITLE:Principal Engineer\nTEL:+15550192834\nEMAIL:alex@qicraft.io\nURL:https://qicraft.io\nEND:VCARD',
      margin: 2,
      errorCorrectionLevel: 'Q',
      style: {
        dotsType: 'rounded',
        dotsColor: '#6366F1',
        backgroundColor: '#FFFFFF',
        gradient: {
          enabled: true,
          type: 'linear',
          colorStops: [
            { offset: 0, color: '#6366F1' },
            { offset: 1, color: '#10B981' },
          ],
          rotation: 45,
        },
        cornerSquareType: 'extra-rounded',
        cornerSquareColor: '#6366F1',
        cornerDotType: 'dot',
        cornerDotColor: '#10B981',
      },
    },
  },
  {
    id: 'guest-wifi-frictionless',
    categoryEn: 'Venue & Access',
    categoryId: 'Akses Wi-Fi Publik',
    titleEn: 'Zero-Friction Guest Wi-Fi',
    titleId: 'Akses Wi-Fi Cepat Pengunjung',
    descriptionEn: 'High contrast emerald green framing designed for wall placards, reception desks, and event spaces.',
    descriptionId: 'Bingkai hijau zamrud kontras tinggi untuk papan dinding, meja resepsionis, dan area pameran acara.',
    tags: ['Wi-Fi Direct', 'High Contrast', 'Wall Placard'],
    payloadType: 'wifi',
    defaultPayload: {
      ssid: 'QiCraft_Guest_WiFi',
      password: 'EnjoyYourStay2026',
      encryption: 'WPA',
      hidden: false,
    },
    recommendedPreset: 'printPoster',
    config: {
      data: 'WIFI:T:WPA;S:QiCraft_Guest_WiFi;P:EnjoyYourStay2026;H:false;;',
      margin: 3,
      errorCorrectionLevel: 'M',
      style: {
        dotsType: 'dots',
        dotsColor: '#00A572',
        backgroundColor: '#FFFFFF',
        cornerSquareType: 'extra-rounded',
        cornerSquareColor: '#00A572',
        cornerDotType: 'dot',
        cornerDotColor: '#00A572',
      },
    },
  },
  {
    id: 'product-packaging-serial',
    categoryEn: 'Retail & Supply Chain',
    categoryId: 'Kemasan & Manufaktur',
    titleEn: 'Product Packaging & Batch Serial',
    titleId: 'Kemasan Produk & Nomor Seri',
    descriptionEn: 'Maximum error correction (Level H 30%) with razor-sharp square dots to survive printing wear and tear.',
    descriptionId: 'Tingkat koreksi kesalahan maksimal (Level H 30%) dengan titik kotak tajam agar tahan goresan cetak.',
    tags: ['Rugged Level H', 'Industrial', 'Packaging'],
    payloadType: 'url',
    defaultPayload: { baseUrl: 'https://verify.qicraft.io/batch/2026-X9' },
    recommendedPreset: 'printBillboard',
    config: {
      data: 'https://verify.qicraft.io/batch/2026-X9',
      margin: 4,
      errorCorrectionLevel: 'H',
      style: {
        dotsType: 'square',
        dotsColor: '#000000',
        backgroundColor: '#FFFFFF',
        cornerSquareType: 'square',
        cornerSquareColor: '#000000',
        cornerDotType: 'square',
        cornerDotColor: '#000000',
      },
    },
  },
  {
    id: 'dual-app-store-target',
    categoryEn: 'Mobile Marketing',
    categoryId: 'Pemasaran Aplikasi',
    titleEn: 'Dual App Store Landing Target',
    titleId: 'Landing Unduhan Aplikasi Mobile',
    descriptionEn: 'Sleek tech gradient and rounded contours for subway ads, billboards, and physical marketing collaterals.',
    descriptionId: 'Gradasi teknologi elegan dan lekukan halus untuk iklan stasiun, baliho, dan materi promosi cetak.',
    tags: ['App Download', 'Modern Tech', 'Out-Of-Home'],
    payloadType: 'url',
    defaultPayload: { baseUrl: 'https://app.qicraft.io/get' },
    recommendedPreset: 'printPoster',
    config: {
      data: 'https://app.qicraft.io/get',
      margin: 2,
      errorCorrectionLevel: 'Q',
      style: {
        dotsType: 'rounded',
        dotsColor: '#3B82F6',
        backgroundColor: '#FFFFFF',
        gradient: {
          enabled: true,
          type: 'linear',
          colorStops: [
            { offset: 0, color: '#3B82F6' },
            { offset: 1, color: '#06B6D4' },
          ],
          rotation: 90,
        },
        cornerSquareType: 'extra-rounded',
        cornerSquareColor: '#3B82F6',
        cornerDotType: 'dot',
        cornerDotColor: '#06B6D4',
      },
    },
  },
  {
    id: 'crypto-cold-receive',
    categoryEn: 'Web3 & Financial Security',
    categoryId: 'Keuangan & Aset Digital',
    titleEn: 'Crypto Wallet Cold Receive',
    titleId: 'Penerimaan Dompet Kripto Aman',
    descriptionEn: 'Diamond pattern geometry with pure monochrome contrast, designed for hardware paper wallets and vault cards.',
    descriptionId: 'Geometri pola berlian dengan kontras monokrom mutlak untuk paper wallet fisik dan brankas dingin.',
    tags: ['Diamond Dots', 'Paper Wallet', 'Cold Storage'],
    payloadType: 'text',
    defaultPayload: '0x71C8564850B321343604E64215E9555C7',
    recommendedPreset: 'printBrochure',
    config: {
      data: '0x71C8564850B321343604E64215E9555C7',
      margin: 3,
      errorCorrectionLevel: 'Q',
      style: {
        dotsType: 'classy',
        dotsColor: '#0F172A',
        backgroundColor: '#FFFFFF',
        cornerSquareType: 'square',
        cornerSquareColor: '#0F172A',
        cornerDotType: 'square',
        cornerDotColor: '#0F172A',
      },
    },
  },
];
