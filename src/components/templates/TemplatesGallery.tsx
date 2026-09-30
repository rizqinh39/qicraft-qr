import React from 'react';
import { TEMPLATES_DATA } from '../../data/templates';
import { TemplateCard } from './TemplateCard';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const TemplatesGallery: React.FC = () => {
  const { locale, setActiveView } = useUIStore();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary-light text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Presets</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t('templates.title', locale)}
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          {t('templates.subtitle', locale)}
        </p>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES_DATA.map((tmpl) => (
          <TemplateCard key={tmpl.id} template={tmpl} />
        ))}
      </div>

      {/* Custom Geometry Callout Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-surface-card to-surface-hover border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white">
            {locale === 'id' ? 'Ingin Bentuk & Geometri Kustom Penuh?' : 'Want custom tailored brand geometry?'}
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            {locale === 'id'
              ? 'Gunakan studio generator interaktif untuk menyusun kombinasi gradasi warna, bentuk titik diamond, dan resolusi cetak 300 DPI bebas hambatan.'
              : 'Use the interactive studio generator to craft infinite color gradients, diamond dot matrices, and 300 DPI print-ready outputs.'}
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setActiveView('studio')}
          className="whitespace-nowrap font-bold"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {locale === 'id' ? 'Buka Studio Generator' : 'Open Studio Generator'}
        </Button>
      </div>
    </div>
  );
};
