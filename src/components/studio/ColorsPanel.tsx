import React from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { calculateContrastRatio, evaluateScannability } from '../../core/scannability/contrastChecker';
import { Badge } from '../ui/Badge';
import { Palette, Check } from 'lucide-react';

const PRESET_SWATCHES = [
  { name: 'Indigo & Pure White', fg: '#6366F1', bg: '#FFFFFF' },
  { name: 'Classic Obsidian Mono', fg: '#0F172A', bg: '#FFFFFF' },
  { name: 'Emerald Trust', fg: '#00A572', bg: '#FFFFFF' },
  { name: 'Midnight High Contrast', fg: '#F8FAFC', bg: '#0B1326' },
  { name: 'Royal Gold & Navy', fg: '#F59E0B', bg: '#0F172A' },
  { name: 'Neon Cyber Cyan', fg: '#06B6D4', bg: '#0B1326' },
];

export const ColorsPanel: React.FC = () => {
  const { config, setStyle } = useQRStore();
  const { locale } = useUIStore();

  const fgColor = config.style.dotsColor;
  const bgColor = config.style.backgroundColor;
  const isGradient = Boolean(config.style.gradient?.enabled);

  // Compute contrast ratio and scannability evaluation
  const effectiveBg = bgColor === 'transparent' ? '#0B1326' : bgColor;
  const ratio = calculateContrastRatio(fgColor, effectiveBg);
  const scannability = evaluateScannability(ratio);

  const badgeVariant = scannability.level === 'optimal'
    ? 'success'
    : scannability.level === 'acceptable'
    ? 'primary'
    : scannability.level === 'warning'
    ? 'warning'
    : 'danger';

  return (
    <div className="space-y-4">
      {/* Real-time Contrast Indicator Pill */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-bg-base border border-border-subtle">
        <span className="text-xs text-slate-300 font-medium">
          WCAG Contrast: <strong className="text-white font-mono">{ratio.toFixed(1)}:1</strong>
        </span>
        <Badge variant={badgeVariant} size="sm">
          {t(scannability.messageKey as any, locale)}
        </Badge>
      </div>

      {/* Foreground and Background Color Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Foreground */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
            <span>{t('accordion.colors.foreground', locale)}</span>
            <span className="text-[11px] font-mono text-slate-400 uppercase">{fgColor}</span>
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setStyle({
                dotsColor: e.target.value,
                cornerSquareColor: e.target.value,
                cornerDotColor: e.target.value,
              })}
              className="w-10 h-10 rounded-md border border-border-subtle bg-bg-base cursor-pointer p-0.5"
            />
            <input
              type="text"
              value={fgColor}
              onChange={(e) => setStyle({
                dotsColor: e.target.value,
                cornerSquareColor: e.target.value,
                cornerDotColor: e.target.value,
              })}
              className="flex-1 px-3 py-2 rounded-md bg-bg-base border border-border-subtle text-xs text-slate-100 font-mono uppercase focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Background */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
            <span>{t('accordion.colors.background', locale)}</span>
            <span className="text-[11px] font-mono text-slate-400 uppercase">
              {bgColor === 'transparent' ? 'TRANSPARENT' : bgColor}
            </span>
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="color"
              value={bgColor === 'transparent' ? '#000000' : bgColor}
              disabled={bgColor === 'transparent'}
              onChange={(e) => setStyle({ backgroundColor: e.target.value })}
              className="w-10 h-10 rounded-md border border-border-subtle bg-bg-base cursor-pointer p-0.5 disabled:opacity-40"
            />
            <input
              type="text"
              value={bgColor}
              disabled={bgColor === 'transparent'}
              onChange={(e) => setStyle({ backgroundColor: e.target.value })}
              className="flex-1 px-3 py-2 rounded-md bg-bg-base border border-border-subtle text-xs text-slate-100 font-mono uppercase focus:outline-none focus:border-primary disabled:opacity-40"
            />
          </div>
        </div>
      </div>

      {/* Transparent Toggle */}
      <div className="flex items-center gap-2 pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={bgColor === 'transparent'}
            onChange={(e) => setStyle({ backgroundColor: e.target.checked ? 'transparent' : '#FFFFFF' })}
            className="w-4 h-4 rounded border-border-subtle bg-bg-base text-primary focus:ring-primary"
          />
          <span className="text-xs text-slate-300 font-medium">
            {t('accordion.colors.transparent', locale)}
          </span>
        </label>
      </div>

      {/* Dual-Tone Linear Gradient Toggle & Controls */}
      <div className="border-t border-border-subtle/80 pt-3 space-y-3">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isGradient}
            onChange={(e) => {
              setStyle({
                gradient: {
                  enabled: e.target.checked,
                  type: 'linear',
                  colorStops: [
                    { offset: 0, color: fgColor },
                    { offset: 1, color: '#10B981' },
                  ],
                  rotation: 45,
                },
              });
            }}
            className="w-4 h-4 rounded border-border-subtle bg-bg-base text-primary focus:ring-primary"
          />
          <span className="text-xs text-slate-200 font-semibold">
            {t('accordion.colors.gradient', locale)}
          </span>
        </label>

        {isGradient && config.style.gradient && (
          <div className="p-3 rounded-lg bg-bg-base/60 border border-border-subtle/60 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Start Color</label>
                <input
                  type="color"
                  value={config.style.gradient.colorStops[0]?.color || fgColor}
                  onChange={(e) => {
                    const stops = [...config.style.gradient!.colorStops];
                    stops[0] = { offset: 0, color: e.target.value };
                    setStyle({ gradient: { ...config.style.gradient!, colorStops: stops } });
                  }}
                  className="w-full h-8 rounded border border-border-subtle bg-bg-base cursor-pointer p-0.5"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">End Color</label>
                <input
                  type="color"
                  value={config.style.gradient.colorStops[1]?.color || '#10B981'}
                  onChange={(e) => {
                    const stops = [...config.style.gradient!.colorStops];
                    stops[1] = { offset: 1, color: e.target.value };
                    setStyle({ gradient: { ...config.style.gradient!, colorStops: stops } });
                  }}
                  className="w-full h-8 rounded border border-border-subtle bg-bg-base cursor-pointer p-0.5"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Gradient Angle</span>
                <span className="font-mono">{config.style.gradient.rotation || 45}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={config.style.gradient.rotation || 45}
                onChange={(e) => {
                  setStyle({
                    gradient: { ...config.style.gradient!, rotation: parseInt(e.target.value, 10) },
                  });
                }}
                className="w-full accent-primary h-1.5 rounded-lg bg-surface-card cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Preset Swatches */}
      <div className="border-t border-border-subtle/80 pt-3">
        <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-primary-light" />
          {t('accordion.colors.swatches', locale)}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PRESET_SWATCHES.map((swatch, idx) => {
            const isSelected = fgColor === swatch.fg && bgColor === swatch.bg && !isGradient;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setStyle({
                    dotsColor: swatch.fg,
                    backgroundColor: swatch.bg,
                    cornerSquareColor: swatch.fg,
                    cornerDotColor: swatch.fg,
                    gradient: { enabled: false, type: 'linear', colorStops: [], rotation: 0 },
                  });
                }}
                className={`p-2 rounded-lg border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-sm'
                    : 'border-border-subtle bg-bg-base/60 hover:bg-surface-hover/60 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <span
                      className="w-4 h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: swatch.fg }}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: swatch.bg }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 line-clamp-1">
                    {swatch.name}
                  </span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary-light" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
