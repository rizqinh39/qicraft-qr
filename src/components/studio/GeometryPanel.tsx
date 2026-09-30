import React from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { DotType, CornerSquareType, CornerDotType } from '../../core/qr/types';
import { Square, Circle, Shield, Diamond, Check } from 'lucide-react';

export const GeometryPanel: React.FC = () => {
  const { config, setStyle } = useQRStore();
  const { locale } = useUIStore();

  const dotPatterns: Array<{ id: DotType; label: string; icon: React.ReactNode }> = [
    { id: 'square', label: 'Square Crisp', icon: <Square className="w-4 h-4" /> },
    { id: 'dots', label: 'Round Dots', icon: <Circle className="w-4 h-4 fill-current" /> },
    { id: 'rounded', label: 'Soft Smooth', icon: <Square className="w-4 h-4 rounded-sm" /> },
    { id: 'classy', label: 'Diamond', icon: <Diamond className="w-4 h-4" /> },
  ];

  const cornerFrames: Array<{ id: CornerSquareType; label: string; icon: React.ReactNode }> = [
    { id: 'square', label: 'Square Frame', icon: <Square className="w-4 h-4 stroke-[2.5]" /> },
    { id: 'extra-rounded', label: 'Rounded Curve', icon: <Square className="w-4 h-4 stroke-[2.5] rounded-md" /> },
    { id: 'dot', label: 'Leaf Style', icon: <Shield className="w-4 h-4" /> },
  ];

  const cornerPupils: Array<{ id: CornerDotType; label: string; icon: React.ReactNode }> = [
    { id: 'square', label: 'Square Pupil', icon: <Square className="w-3.5 h-3.5 fill-current" /> },
    { id: 'dot', label: 'Circle Pupil', icon: <Circle className="w-3.5 h-3.5 fill-current" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Body Dots Pattern */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-2">
          {t('accordion.shapes.dots', locale)}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {dotPatterns.map((item) => {
            const isSelected = config.style.dotsType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStyle({ dotsType: item.id })}
                className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/15 text-white shadow-sm'
                    : 'border-border-subtle bg-bg-base text-slate-400 hover:text-white hover:bg-surface-hover'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-[11px]">{item.label}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary-light" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Corner Eye Frame Curvature */}
      <div className="border-t border-border-subtle/80 pt-3">
        <label className="block text-xs font-semibold text-slate-200 mb-2">
          {t('accordion.shapes.cornerFrame', locale)}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {cornerFrames.map((item) => {
            const isSelected = config.style.cornerSquareType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStyle({ cornerSquareType: item.id })}
                className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/15 text-white shadow-sm'
                    : 'border-border-subtle bg-bg-base text-slate-400 hover:text-white hover:bg-surface-hover'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-[11px]">{item.label}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary-light" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center Corner Pupil */}
      <div className="border-t border-border-subtle/80 pt-3">
        <label className="block text-xs font-semibold text-slate-200 mb-2">
          {t('accordion.shapes.centerEye', locale)}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {cornerPupils.map((item) => {
            const isSelected = config.style.cornerDotType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStyle({ cornerDotType: item.id })}
                className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/15 text-white shadow-sm'
                    : 'border-border-subtle bg-bg-base text-slate-400 hover:text-white hover:bg-surface-hover'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-[11px]">{item.label}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary-light" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
