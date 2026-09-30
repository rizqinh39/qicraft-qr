import React, { useRef } from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { Image, Upload, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const LogoPanel: React.FC = () => {
  const { config, setLogo } = useQRStore();
  const { locale } = useUIStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setLogo({ image: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setLogo({ image: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* File Upload Zone */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        onChange={handleFileUpload}
        className="hidden"
      />

      {!config.logo.image ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-6 px-4 rounded-xl border-2 border-dashed border-border-subtle hover:border-primary/60 bg-bg-base/60 hover:bg-surface-hover/50 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
        >
          <div className="p-3 rounded-full bg-surface-card group-hover:bg-primary/20 text-slate-300 group-hover:text-primary-light transition-colors">
            <Upload className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-200">
            {t('accordion.logo.upload', locale)}
          </span>
          <span className="text-[11px] text-slate-500">
            PNG, SVG, JPG, WebP (Max 2MB)
          </span>
        </button>
      ) : (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-bg-base border border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-surface-card border border-border-subtle p-1 flex items-center justify-center overflow-hidden">
              <img
                src={config.logo.image}
                alt="Brand Logo Preview"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-primary-light" />
                Active Brand Emblem
              </p>
              <p className="text-[11px] text-slate-400">Embedded in QR center</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            icon={<Trash2 className="w-3.5 h-3.5" />}
          >
            {t('accordion.logo.remove', locale)}
          </Button>
        </div>
      )}

      {/* Protective Halo & Scale Slider (Available when logo is attached) */}
      {config.logo.image && (
        <div className="space-y-3.5 border-t border-border-subtle/80 pt-3">
          {/* Protective Halo */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={config.logo.hasHalo}
              onChange={(e) => setLogo({ hasHalo: e.target.checked })}
              className="w-4 h-4 rounded border-border-subtle bg-bg-base text-primary focus:ring-primary"
            />
            <span className="text-xs text-slate-200 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {t('accordion.logo.halo', locale)}
            </span>
          </label>

          {/* Scale Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span>{t('accordion.logo.size', locale)}</span>
              <span className="font-mono text-primary-light">{Math.round(config.logo.size * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.35"
              step="0.01"
              value={config.logo.size}
              onChange={(e) => setLogo({ size: parseFloat(e.target.value) })}
              className="w-full accent-primary h-1.5 rounded-lg bg-bg-base cursor-pointer"
            />
          </div>

          {/* Auto elevation notice */}
          <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-primary-light flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-primary-light leading-relaxed">
              {t('accordion.security.logoWarning', locale)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
