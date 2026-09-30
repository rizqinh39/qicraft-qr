import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { Button } from '../ui/Button';
import {
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Cpu,
  Printer,
  Sparkles,
  Lock,
  Layers,
  CheckCircle2,
  FileCode,
  Scan,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { locale, setActiveView } = useUIStore();

  const architecturalPillars = [
    {
      icon: <Cpu className="w-5 h-5 text-primary-light" />,
      titleEn: '100% Client-Side Engine',
      titleId: '100% Komputasi Sisi-Klien',
      descEn:
        'All Reed-Solomon math, geometric synthesis, and pixel rasterization run strictly inside your local browser via WebAssembly and HTML5 Canvas. Zero network requests are sent during code generation.',
      descId:
        'Seluruh kalkulasi matematika Reed-Solomon, sintesis geometri, dan rasterisasi piksel dieksekusi murni di browser lokal Anda. Tanpa pengiriman data jaringan apa pun saat pembuatan kode.',
    },
    {
      icon: <Printer className="w-5 h-5 text-emerald-400" />,
      titleEn: 'Print-Calibrated DPI (300 & 600)',
      titleId: 'Kalibrasi Cetak Presisi (300 & 600 DPI)',
      descEn:
        'Commercial lithography and screen printing require 300+ dots per inch to avoid blurry modules. QiCraft calculates exact physical centimeter and inch dimensions with infinite-resolution vector SVG export.',
      descId:
        'Percetakan profesional dan sablon memerlukan minimal 300 titik per inci agar modul QR tidak buram. QiCraft menghitung dimensi fisik nyata (cm & inch) serta mendukung ekspor vektor SVG resolusi tak terbatas.',
    },
    {
      icon: <Lock className="w-5 h-5 text-amber-400" />,
      titleEn: 'Zero-Telemetry & Strict Privacy',
      titleId: 'Privasi Mutlak & Bebas Telemetri',
      descEn:
        'Guaranteed zero logging of Wi-Fi security keys or vCard contact details. Hardened with a strict Content Security Policy (CSP) blocking all third-party tracking pixels, Google Analytics, and ad cookies.',
      descId:
        'Jaminan tanpa pencatatan sandi Wi-Fi maupun data kontak vCard. Dilindungi Content Security Policy (CSP) ketat yang memblokir semua pelacak pihak ketiga, Google Analytics, dan cookie periklanan.',
    },
    {
      icon: <Scan className="w-5 h-5 text-primary-light" />,
      titleEn: 'Permanent Optical Lifespan',
      titleId: 'Masa Pakai Optik Permanen',
      descEn:
        'Because data is encoded directly into physical binary dots, your codes will scan forever as long as the printed medium is readable. No cloud expiration, no recurring fees, and no hostage situations.',
      descId:
        'Karena data langsung diubah menjadi modul biner fisik hitam-putih, QR Anda akan terbaca selamanya selama media cetak utuh. Tanpa tanggal kedaluwarsa, tanpa biaya langganan, dan tanpa sandera.',
    },
  ];

  const standards = [
    {
      badge: 'ISO/IEC 18004:2015',
      nameEn: 'International QR Code Standard',
      nameId: 'Standar Internasional Matriks QR Code',
      detailEn: 'Standardized square module geometry, timing tracks, and format info.',
      detailId: 'Geometri modul persegi terstandarisasi, jalur timing, dan info format.',
    },
    {
      badge: 'Galois Field GF(256)',
      nameEn: 'Reed-Solomon Error Correction',
      nameId: 'Koreksi Kesalahan Reed-Solomon',
      detailEn: 'Algorithmic polynomial parity providing 7% to 30% mathematical recovery.',
      detailId: 'Polinomial paritas matematis untuk pemulihan data rusak sebesar 7% hingga 30%.',
    },
    {
      badge: 'RFC 6350',
      nameEn: 'vCard 4.0 Contact Specification',
      nameId: 'Spesifikasi Kontak vCard 4.0',
      detailEn: 'Universal address book parsing across iOS, Android, macOS, and Windows.',
      detailId: 'Dukungan buku telepon universal di iOS, Android, macOS, dan Windows.',
    },
    {
      badge: 'WCAG 2.1 Level AA',
      nameEn: 'Optical Contrast Evaluation',
      nameId: 'Evaluasi Rasio Kontras Optik',
      detailEn: 'Relative luminance formula guaranteeing optical legibility for camera sensors.',
      detailId: 'Formula relative luminance menjamin keterbacaan optik bagi sensor kamera.',
    },
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary-light text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t('about.badge', locale)}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {t('about.title', locale)}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('about.subtitle', locale)}
        </p>
      </div>

      {/* The Core Contrast: The Scam vs QiCraft Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scam Warning Card */}
        <div className="p-6 sm:p-7 rounded-xl bg-surface-card border border-red-500/30 relative overflow-hidden shadow-lg space-y-3.5">
          <div className="flex items-center gap-2.5 text-red-400">
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {t('about.scam.title', locale)}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {t('about.scam.desc', locale)}
          </p>
          <div className="pt-2 border-t border-border-subtle/80 flex items-center gap-2 text-xs text-red-400 font-semibold">
            <span>✕ {locale === 'id' ? 'Menyandera link & cetakan Anda' : 'Holds your print runs hostage'}</span>
          </div>
        </div>

        {/* QiCraft Solution Card */}
        <div className="p-6 sm:p-7 rounded-xl bg-surface-card border border-emerald-500/30 relative overflow-hidden shadow-lg space-y-3.5">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {t('about.solution.title', locale)}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {t('about.solution.desc', locale)}
          </p>
          <div className="pt-2 border-t border-border-subtle/80 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <span>✓ {locale === 'id' ? '100% Permanen, langsung & tanpa biaya' : '100% Permanent, direct & zero cost'}</span>
          </div>
        </div>
      </div>

      {/* Mission & Philosophy Deep Dive */}
      <div className="p-6 sm:p-8 rounded-xl bg-surface-card border border-border-subtle shadow-md space-y-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-primary-light" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {t('about.mission.title', locale)}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
          {t('about.mission.desc', locale)}
        </p>
      </div>

      {/* 4 Architectural Pillars */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary-light" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            {locale === 'id' ? '4 Pilar Arsitektur & Rekayasa' : '4 Pillars of Engineering & Integrity'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {architecturalPillars.map((p, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-xl bg-surface-card border border-border-subtle hover:border-slate-500/60 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-lg bg-bg-base border border-border-subtle w-fit mb-3.5">
                  {p.icon}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">
                  {locale === 'id' ? p.titleId : p.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {locale === 'id' ? p.descId : p.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Standards Compliance */}
      <div className="p-6 sm:p-8 rounded-xl bg-surface-card border border-border-subtle shadow-md space-y-5">
        <div className="flex items-center gap-2.5">
          <FileCode className="w-5 h-5 text-primary-light" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            {t('about.specs.title', locale)}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {standards.map((std, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-bg-base/70 border border-border-subtle flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-primary/15 text-primary-light border border-primary/30 mb-2">
                  {std.badge}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                  {locale === 'id' ? std.nameId : std.nameEn}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {locale === 'id' ? std.detailId : std.detailEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zero Telemetry Pledge Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-surface-card via-surface-card to-surface-hover border border-border-subtle shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            {t('about.pledge.title', locale)}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
          {t('about.pledge.desc', locale)}
        </p>
      </div>

      {/* Call To Action Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 via-surface-card to-surface-hover border border-primary/30 text-center space-y-4 shadow-xl">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          {t('about.cta.title', locale)}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          {t('about.cta.desc', locale)}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              setActiveView('studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bold shadow-lg shadow-primary/30"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {t('about.cta.button', locale)}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              setActiveView('how-it-works');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-semibold"
          >
            {t('nav.howItWorks', locale)}
          </Button>
        </div>
      </div>
    </div>
  );
};
