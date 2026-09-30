import React from 'react';
import { PipelineDiagram } from './PipelineDiagram';
import { ComparisonTable } from './ComparisonTable';
import { FaqAccordion } from './FaqAccordion';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { Button } from '../ui/Button';
import { ShieldCheck, ArrowRight, Binary } from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { locale, setActiveView } = useUIStore();

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Cryptographically Pure & Permanent</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('how.title', locale)}
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t('how.subtitle', locale)}
        </p>
      </div>

      {/* Section 1: 4-Step Mathematical Pipeline */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Binary className="w-4 h-4 text-primary-light" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            {t('how.pipeline.title', locale)}
          </h2>
        </div>
        <PipelineDiagram />
      </div>

      {/* Section 2: Comparison Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            {t('how.comparison.title', locale)}
          </h2>
        </div>
        <ComparisonTable />
      </div>

      {/* Section 3: Technical FAQ */}
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-white">
          {t('how.faq.title', locale)}
        </h2>
        <FaqAccordion />
      </div>

      {/* Call To Action Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 via-surface-card to-surface-hover border border-primary/30 text-center space-y-4 shadow-xl">
        <h3 className="text-xl font-extrabold text-white">
          {locale === 'id' ? 'Siap Membuat QR Code Permanen Anda?' : 'Ready to build permanent, scannable QR codes?'}
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {locale === 'id'
            ? '100% gratis, aman dari pelacakan server, dan siap cetak hingga resolusi 4096px 300 DPI.'
            : '100% free, private with zero cloud tracking, and export-ready up to 4096px @ 300 DPI.'}
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setActiveView('studio')}
          className="font-bold shadow-lg shadow-primary/30"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {locale === 'id' ? 'Buka Studio Generator' : 'Launch Studio Generator'}
        </Button>
      </div>
    </div>
  );
};
