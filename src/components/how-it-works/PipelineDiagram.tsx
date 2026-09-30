import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { Binary, ShieldCheck, Grid3X3, ScanLine } from 'lucide-react';

export const PipelineDiagram: React.FC = () => {
  const { locale } = useUIStore();

  const steps = [
    {
      num: '01',
      icon: <Binary className="w-5 h-5 text-primary-light" />,
      titleEn: 'Direct Data Encoding',
      titleId: 'Pengkodean Data Langsung',
      descEn: 'Raw URLs, Wi-Fi passwords, or vCards are encoded directly into binary alphanumeric data blocks using ISO/IEC 18004 standards.',
      descId: 'Tautan URL, sandi Wi-Fi, atau vCard diubah langsung menjadi blok data biner terstandarisasi ISO/IEC 18004 tanpa URL perantara.',
    },
    {
      num: '02',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      titleEn: 'Reed-Solomon Parity Protection',
      titleId: 'Perlindungan Paritas Reed-Solomon',
      descEn: 'Galois Field mathematics synthesize redundancy codewords (7% to 30%), allowing codes to scan even if scratched or obscured by logos.',
      descId: 'Aljabar Galois Field memproduksi kode paritas cadangan (7% - 30%), memastikan QR tetap terbaca meski tergores atau terhalang logo.',
    },
    {
      num: '03',
      icon: <Grid3X3 className="w-5 h-5 text-amber-400" />,
      titleEn: 'Vector Matrix Synthesis',
      titleId: 'Sintesis Matriks Vektor',
      descEn: 'Position detection eyes, timing tracks, and custom geometric modules are rasterized into infinite-resolution vector coordinates.',
      descId: 'Bingkai mata sudut pemosisian, jalur timing, dan modul geometris disatukan menjadi koordinat vektor resolusi tak terbatas.',
    },
    {
      num: '04',
      icon: <ScanLine className="w-5 h-5 text-primary-light" />,
      titleEn: 'Permanent Offline Optical Scans',
      titleId: 'Pindai Optik Permanen Offline',
      descEn: 'Camera optical sensors decode the black/white contrast instantly in-device. No internet, no redirect servers, no expiration dates.',
      descId: 'Sensor optik kamera memproses kontras warna langsung di ponsel. Tanpa perlu internet, tanpa server pengalih, dan tanpa tanggal kedaluwarsa.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="p-5 rounded-xl bg-surface-card border border-border-subtle relative flex flex-col justify-between shadow-md hover:border-primary/40 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-extrabold font-mono text-slate-500">
                {step.num}
              </span>
              <div className="p-2.5 rounded-lg bg-bg-base border border-border-subtle">
                {step.icon}
              </div>
            </div>
            <h3 className="text-sm font-bold text-white mb-2">
              {locale === 'id' ? step.titleId : step.titleEn}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {locale === 'id' ? step.descId : step.descEn}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
