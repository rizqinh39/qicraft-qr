import React from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { calculateContrastRatio, evaluateScannability } from '../../core/scannability/contrastChecker';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export const ScannabilityBadge: React.FC = () => {
  const { config } = useQRStore();
  const { locale } = useUIStore();

  const fg = config.style.dotsColor;
  const bg = config.style.backgroundColor === 'transparent' ? '#0B1326' : config.style.backgroundColor;

  const ratio = calculateContrastRatio(fg, bg);
  const result = evaluateScannability(ratio);

  const getStyle = () => {
    switch (result.level) {
      case 'optimal':
        return {
          wrapper: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-400 animate-pulse',
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
        };
      case 'acceptable':
        return {
          wrapper: 'bg-primary/10 border-primary/30 text-primary-light',
          dot: 'bg-primary-light',
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
        };
      case 'warning':
        return {
          wrapper: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          dot: 'bg-amber-400',
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
        };
      case 'critical':
        return {
          wrapper: 'bg-red-500/10 border-red-500/30 text-red-400',
          dot: 'bg-red-400 animate-ping',
          icon: <AlertOctagon className="w-3.5 h-3.5" />,
        };
    }
  };

  const style = getStyle();

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${style.wrapper}`}>
      <span className={`w-2 h-2 rounded-full ${style.dot}`} />
      {style.icon}
      <span>{t(result.messageKey as any, locale)}</span>
      <span className="font-mono opacity-80">({ratio.toFixed(1)}:1)</span>
    </div>
  );
};
