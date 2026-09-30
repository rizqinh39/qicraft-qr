import React from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { PhoneCall, MessageSquare } from 'lucide-react';

export const SmsInputPanel: React.FC = () => {
  const { smsPayload, setSmsPayload } = useQRStore();
  const { locale } = useUIStore();

  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
          <PhoneCall className="w-3.5 h-3.5 text-primary-light" />
          {t('field.sms.phone', locale)}
        </label>
        <input
          type="tel"
          value={smsPayload.phone}
          onChange={(e) => setSmsPayload({ phone: e.target.value })}
          placeholder="+1234567890"
          className="w-full px-3.5 py-2.5 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-primary-light" />
          {t('field.sms.message', locale)}
        </label>
        <textarea
          rows={3}
          value={smsPayload.message || ''}
          onChange={(e) => setSmsPayload({ message: e.target.value })}
          placeholder="Pre-filled message text..."
          className="w-full px-3.5 py-2.5 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-y"
        />
      </div>
    </div>
  );
};
