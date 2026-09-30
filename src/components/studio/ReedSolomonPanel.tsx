import React from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { ErrorCorrectionLevel } from '../../core/qr/types';
import { resolveErrorCorrectionLevel } from '../../core/qr/safetyGuard';
import { Shield, ShieldAlert, Check } from 'lucide-react';

export const ReedSolomonPanel: React.FC = () => {
  const { config, setErrorCorrection, setMargin } = useQRStore();
  const { locale } = useUIStore();

  const hasLogo = Boolean(config.logo.image);
  const effectiveLevel = resolveErrorCorrectionLevel(config.errorCorrectionLevel, hasLogo);

  const levels: Array<{ id: ErrorCorrectionLevel; label: string; pct: string; desc: string }> = [
    { id: 'L', label: 'Level L', pct: '7%', desc: 'Low parity, highest data density' },
    { id: 'M', label: 'Level M', pct: '15%', desc: 'Standard balance (recommended)' },
    { id: 'Q', label: 'Level Q', pct: '25%', desc: 'High resilience, ideal for logos' },
    { id: 'H', label: 'Level H', pct: '30%', desc: 'Ultra rugged for damaged media' },
  ];

  return (
    <div className="space-y-4">
      {/* Error Correction Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-2">
          {t('accordion.security.errorCorrection', locale)}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {levels.map((lvl) => {
            const isSelected = effectiveLevel === lvl.id;
            const isElevatedFromUser = hasLogo && config.errorCorrectionLevel !== effectiveLevel && isSelected;

            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setErrorCorrection(lvl.id)}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/15 shadow-sm'
                    : 'border-border-subtle bg-bg-base hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{lvl.label}</span>
                  <span className="text-[11px] font-mono text-primary-light">{lvl.pct}</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">{lvl.desc}</p>
                {isSelected && (
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-primary-light font-semibold">
                    <Check className="w-3 h-3" />
                    <span>{isElevatedFromUser ? 'Auto-Protected' : 'Active'}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {hasLogo && config.errorCorrectionLevel !== effectiveLevel && (
        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="text-[11px] text-amber-300">
            {t('accordion.security.logoWarning', locale)}
          </span>
        </div>
      )}

      {/* Quiet Zone Margin Slider */}
      <div className="border-t border-border-subtle/80 pt-3">
        <div className="flex justify-between text-xs text-slate-200 font-semibold mb-2">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-primary-light" />
            {t('accordion.security.quietZone', locale)}
          </span>
          <span className="font-mono text-primary-light">{config.margin} modules</span>
        </div>
        <input
          type="range"
          min="0"
          max="4"
          step="1"
          value={config.margin}
          onChange={(e) => setMargin(parseInt(e.target.value, 10))}
          className="w-full accent-primary h-1.5 rounded-lg bg-bg-base cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>0 (Border flush)</span>
          <span>2 (Standard)</span>
          <span>4 (High ISO margin)</span>
        </div>
      </div>
    </div>
  );
};
