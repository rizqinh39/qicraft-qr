import React, { useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { PreviewCanvas } from './PreviewCanvas';
import { ScannabilityBadge } from './ScannabilityBadge';
import { ExportControls } from './ExportControls';
import { QrCode, X, ChevronUp } from 'lucide-react';

export const MobilePreviewDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useUIStore();

  return (
    <div className="lg:hidden">
      {/* Floating Bottom Bar Trigger */}
      <div className="fixed bottom-4 left-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full py-3 px-4 rounded-xl bg-primary text-white font-bold text-sm shadow-xl shadow-primary/30 flex items-center justify-between border border-primary-light/30 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-md bg-white/20">
              <QrCode className="w-4 h-4" />
            </div>
            <span>{t('preview.title', locale)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/90">
            <span>View & Export</span>
            <ChevronUp className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Slide-over / Modal Sheet Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface-card border border-border-subtle shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header & Close */}
            <div className="flex items-center justify-between border-b border-border-subtle/80 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-primary-light" />
                <h3 className="text-sm font-bold text-white">
                  {t('preview.title', locale)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-surface-hover text-slate-400 hover:text-white"
                aria-label="Close Preview Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scannability indicator */}
            <div className="flex justify-center">
              <ScannabilityBadge />
            </div>

            {/* Canvas */}
            <PreviewCanvas />

            {/* Export buttons */}
            <ExportControls />
          </div>
        </div>
      )}
    </div>
  );
};
