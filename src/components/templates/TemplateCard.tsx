import React, { useEffect, useRef } from 'react';
import { ITemplatePreset } from '../../data/templates';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { QRRenderer } from '../../core/qr/QRRenderer';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export const TemplateCard: React.FC<{ template: ITemplatePreset }> = ({ template }) => {
  const { applyFullConfig, setPayloadType, setUrlPayload, setWifiPayload, setVcardPayload, setTextPayload, setPrintPreset } = useQRStore();
  const { locale, setActiveView, showToast } = useUIStore();
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const fullConfig: any = {
      ...template.config,
      width: 180,
      height: 180,
      data: template.config.data || 'https://qicraft.io',
      logo: { size: 0.2, margin: 4, hasHalo: true },
    };
    const renderer = new QRRenderer(fullConfig);
    renderer.append(canvasRef.current);
  }, [template]);

  const handleApply = () => {
    // 1. Apply style, error correction, margin
    applyFullConfig(template.config);

    // 2. Set payload type and value
    setPayloadType(template.payloadType);
    if (template.payloadType === 'url') {
      setUrlPayload(template.defaultPayload);
    } else if (template.payloadType === 'wifi') {
      setWifiPayload(template.defaultPayload);
    } else if (template.payloadType === 'vcard') {
      setVcardPayload(template.defaultPayload);
    } else if (template.payloadType === 'text') {
      setTextPayload(template.defaultPayload);
    }

    // 3. Set recommended print preset
    setPrintPreset(template.recommendedPreset);

    // 4. Switch to studio & notify
    setActiveView('studio');
    showToast(t('templates.applied', locale));
  };

  const title = locale === 'id' ? template.titleId : template.titleEn;
  const description = locale === 'id' ? template.descriptionId : template.descriptionEn;
  const category = locale === 'id' ? template.categoryId : template.categoryEn;

  return (
    <div className="rounded-xl bg-surface-card border border-border-subtle hover:border-slate-500/80 shadow-md p-5 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl group">
      <div>
        {/* Preview Thumbnail */}
        <div className="w-full py-4 rounded-lg bg-bg-base/80 border border-border-subtle/80 flex items-center justify-center mb-4 overflow-hidden group-hover:border-primary/40 transition-colors">
          <div ref={canvasRef} className="rounded-lg overflow-hidden flex items-center justify-center" />
        </div>

        {/* Category & Tags */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-light">
            {category}
          </span>
          <div className="flex items-center gap-1">
            {template.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-1.5 py-0.5 rounded bg-surface-hover text-slate-400 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-primary-light transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>
      </div>

      {/* Action Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={handleApply}
        className="w-full justify-center text-xs font-semibold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
        icon={<ArrowRight className="w-3.5 h-3.5" />}
      >
        {t('templates.apply', locale)}
      </Button>
    </div>
  );
};
