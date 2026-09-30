import React, { useState } from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { Link2, ChevronDown, ChevronUp, Tag } from 'lucide-react';

export const UrlInputPanel: React.FC = () => {
  const { urlPayload, setUrlPayload } = useQRStore();
  const { locale } = useUIStore();
  const [showUtm, setShowUtm] = useState(Boolean(urlPayload.utmSource || urlPayload.utmMedium || urlPayload.utmCampaign));

  return (
    <div className="space-y-4">
      {/* Destination URL */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
          <Link2 className="w-3.5 h-3.5 text-primary-light" />
          {t('field.url.label', locale)}
        </label>
        <div className="relative">
          <input
            type="url"
            value={urlPayload.baseUrl}
            onChange={(e) => setUrlPayload({ baseUrl: e.target.value })}
            placeholder={t('field.url.placeholder', locale)}
            className="w-full px-3.5 py-2.5 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </div>

      {/* UTM Collapsible Toggle */}
      <div className="border border-border-subtle/80 rounded-md bg-bg-base/40 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowUtm(!showUtm)}
          className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-primary-light" />
            {t('field.utm.title', locale)}
          </span>
          {showUtm ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showUtm && (
          <div className="p-3.5 pt-1 space-y-3 border-t border-border-subtle/60 bg-surface-card/40">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t('field.utm.source', locale)}
              </label>
              <input
                type="text"
                value={urlPayload.utmSource || ''}
                onChange={(e) => setUrlPayload({ utmSource: e.target.value })}
                placeholder="newsletter, google, flyer"
                className="w-full px-3 py-2 rounded bg-bg-base border border-border-subtle text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {t('field.utm.medium', locale)}
                </label>
                <input
                  type="text"
                  value={urlPayload.utmMedium || ''}
                  onChange={(e) => setUrlPayload({ utmMedium: e.target.value })}
                  placeholder="qr_print, banner, social"
                  className="w-full px-3 py-2 rounded bg-bg-base border border-border-subtle text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {t('field.utm.campaign', locale)}
                </label>
                <input
                  type="text"
                  value={urlPayload.utmCampaign || ''}
                  onChange={(e) => setUrlPayload({ utmCampaign: e.target.value })}
                  placeholder="spring_sale, launch2026"
                  className="w-full px-3 py-2 rounded bg-bg-base border border-border-subtle text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
