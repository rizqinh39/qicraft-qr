import React from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { FileText } from 'lucide-react';

export const TextInputPanel: React.FC = () => {
  const { textPayload, setTextPayload } = useQRStore();
  const { locale } = useUIStore();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-200 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-primary-light" />
          {t('field.text.label', locale)}
        </label>
        <span className="text-[11px] text-slate-500 font-mono">
          {textPayload.length} chars
        </span>
      </div>
      <textarea
        rows={4}
        value={textPayload}
        onChange={(e) => setTextPayload(e.target.value)}
        placeholder={t('field.text.placeholder', locale)}
        className="w-full px-3.5 py-2.5 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y"
      />
    </div>
  );
};
