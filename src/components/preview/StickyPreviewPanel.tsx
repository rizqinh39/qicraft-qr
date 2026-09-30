import React from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { PreviewCanvas } from './PreviewCanvas';
import { ScannabilityBadge } from './ScannabilityBadge';
import { ExportControls } from './ExportControls';
import { calculatePrintDimensions } from '../../core/dpi/printCalculator';
import { Sparkles, Printer, Layers } from 'lucide-react';

export const StickyPreviewPanel: React.FC = () => {
  const { config, printConfig } = useQRStore();
  const { locale } = useUIStore();

  const printCalc = calculatePrintDimensions(printConfig.pixels, printConfig.dpi);

  return (
    <div className="rounded-2xl bg-surface-card border border-border-subtle shadow-xl p-5 sm:p-6 space-y-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border-subtle/80 pb-3.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary-light" />
          <h2 className="text-sm font-bold text-white tracking-tight">
            {t('preview.title', locale)}
          </h2>
        </div>
        <ScannabilityBadge />
      </div>

      {/* Main Preview Viewport */}
      <PreviewCanvas />

      {/* Current Export Specs Summary */}
      <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-lg bg-bg-base/60 border border-border-subtle">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-primary-light" />
          <div>
            <span className="text-[10px] text-slate-500 block leading-none">Format</span>
            <span className="font-semibold text-slate-200">
              {config.style.dotsType} / {config.style.cornerSquareType}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 border-l border-border-subtle/60 pl-3">
          <Printer className="w-3.5 h-3.5 text-emerald-400" />
          <div>
            <span className="text-[10px] text-slate-500 block leading-none">Print Scale</span>
            <span className="font-semibold text-slate-200 font-mono">
              ~{printCalc.cm.toFixed(1)} cm ({printConfig.dpi} DPI)
            </span>
          </div>
        </div>
      </div>

      {/* Export Action Buttons */}
      <ExportControls />
    </div>
  );
};
