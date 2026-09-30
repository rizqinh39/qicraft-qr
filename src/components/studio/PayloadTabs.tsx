import React from 'react';
import { useQRStore, PayloadType } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { Globe, Wifi, Contact, FileText, MessageSquare } from 'lucide-react';

interface TabItem {
  id: PayloadType;
  labelKey: 'tab.url' | 'tab.wifi' | 'tab.vcard' | 'tab.text' | 'tab.sms';
  icon: React.ReactNode;
}

export const PayloadTabs: React.FC = () => {
  const { payloadType, setPayloadType } = useQRStore();
  const { locale } = useUIStore();

  const tabs: TabItem[] = [
    { id: 'url', labelKey: 'tab.url', icon: <Globe className="w-4 h-4" /> },
    { id: 'wifi', labelKey: 'tab.wifi', icon: <Wifi className="w-4 h-4" /> },
    { id: 'vcard', labelKey: 'tab.vcard', icon: <Contact className="w-4 h-4" /> },
    { id: 'text', labelKey: 'tab.text', icon: <FileText className="w-4 h-4" /> },
    { id: 'sms', labelKey: 'tab.sms', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full overflow-x-auto pb-1 scrollbar-none">
      <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-card border border-border-subtle min-w-max">
        {tabs.map((tab) => {
          const isActive = payloadType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setPayloadType(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-sm shadow-primary/30'
                  : 'text-slate-300 hover:text-white hover:bg-surface-hover'
              }`}
            >
              {tab.icon}
              <span>{t(tab.labelKey, locale)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
