import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { Check, X } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const { locale } = useUIStore();

  const rows = [
    {
      featureEn: 'Code Expiration',
      featureId: 'Kedaluwarsa Kode',
      qicraft: { val: 'Never Expires (Permanent)', good: true },
      commercial: { val: 'Expires after 14-30 days trial', good: false },
    },
    {
      featureEn: 'URL Shortener Trap',
      featureId: 'Jebakan URL Shortener',
      qicraft: { val: 'None — Direct raw payload', good: true },
      commercial: { val: 'Proxied through proprietary redirect', good: false },
    },
    {
      featureEn: 'User Telemetry & Tracking',
      featureId: 'Pelacakan Data & Telemetri',
      qicraft: { val: 'Zero — 100% in-browser private', good: true },
      commercial: { val: 'Tracks IP, GPS location, device OS', good: false },
    },
    {
      featureEn: 'Offline Scanning',
      featureId: 'Pemindaian Offline',
      qicraft: { val: 'Fully functional without internet', good: true },
      commercial: { val: 'Fails without internet connection', good: false },
    },
    {
      featureEn: 'Scanning Speed',
      featureId: 'Kecepatan Buka Kamera',
      qicraft: { val: 'Instant optical decode (<50ms)', good: true },
      commercial: { val: 'Slow (1-3s redirect latency)', good: false },
    },
    {
      featureEn: 'Cost & Subscription',
      featureId: 'Biaya Langganan Bulanan',
      qicraft: { val: 'Free & Open Forever (0 IDR / $0)', good: true },
      commercial: { val: '$10 - $40 / month recurring', good: false },
    },
  ];

  return (
    <div className="rounded-2xl bg-surface-card border border-border-subtle overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle bg-bg-base/60">
              <th className="py-4 px-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {locale === 'id' ? 'Kriteria' : 'Criteria'}
              </th>
              <th className="py-4 px-5 text-xs font-bold text-primary-light uppercase tracking-wider bg-primary/10 border-x border-border-subtle">
                QiCraft (Static & Private)
              </th>
              <th className="py-4 px-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Commercial Dynamic QR Services
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-xs">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-surface-hover/30 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-slate-200">
                  {locale === 'id' ? row.featureId : row.featureEn}
                </td>
                <td className="py-3.5 px-5 font-medium text-slate-100 bg-primary/5 border-x border-border-subtle">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{row.qicraft.val}</span>
                  </div>
                </td>
                <td className="py-3.5 px-5 text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3" />
                    </div>
                    <span>{row.commercial.val}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
