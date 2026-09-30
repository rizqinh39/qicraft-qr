import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { Shield, Infinity, DatabaseZap, ScanLine } from 'lucide-react';

export const Footer: React.FC = () => {
  const { locale, setActiveView } = useUIStore();

  const trustPillars = [
    {
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      titleEn: '100% Static & Client-Side',
      titleId: '100% Statis & Sisi-Klien',
      descEn: 'Zero data pings or external telemetry servers.',
      descId: 'Tanpa pengiriman data ke server telemetri luar.',
    },
    {
      icon: <Infinity className="w-4 h-4 text-primary-light" />,
      titleEn: 'Never Expires',
      titleId: 'Tidak Akan Kedaluwarsa',
      descEn: 'Direct payload matrix with no subscription redirect paywalls.',
      descId: 'Data langsung di matriks QR tanpa jebakan langganan.',
    },
    {
      icon: <DatabaseZap className="w-4 h-4 text-amber-400" />,
      titleEn: 'No Cloud Database',
      titleId: 'Tanpa Database Cloud',
      descEn: 'Confidential Wi-Fi & contact details remain solely yours.',
      descId: 'Kata sandi Wi-Fi dan kontak tersimpan privat di browser.',
    },
    {
      icon: <ScanLine className="w-4 h-4 text-emerald-400" />,
      titleEn: 'Unlimited Scans Forever',
      titleId: 'Pindai Tanpa Batas Selamanya',
      descEn: 'Pure optical ISO standard readable by all smartphone cameras.',
      descId: 'Standar optik ISO terbaca oleh semua jenis kamera.',
    },
  ];

  return (
    <footer className="w-full border-t border-border-subtle bg-bg-base/80 mt-16 pb-12 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-8 border-b border-border-subtle">
          {trustPillars.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-card/60 border border-border-subtle/60"
            >
              <div className="p-2 rounded-md bg-surface-hover flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">
                  {locale === 'id' ? item.titleId : item.titleEn}
                </h4>
                <p className="text-xs text-slate-300 leading-snug mt-0.5">
                  {locale === 'id' ? item.descId : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} QiCraft QR Studio. Built for open, permanent, and private digital infrastructure.</p>
          <div className="flex items-center gap-4 text-slate-300">
            <button
              type="button"
              onClick={() => {
                setActiveView('how-it-works');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('nav.howItWorks', locale)}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setActiveView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {locale === 'id' ? 'Tentang' : 'About'}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setActiveView('templates');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('nav.templates', locale)}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
