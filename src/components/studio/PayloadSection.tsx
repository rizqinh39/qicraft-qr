import React from 'react';
import { useQRStore } from '../../store/useQRStore';
import { PayloadTabs } from './PayloadTabs';
import { UrlInputPanel } from './UrlInputPanel';
import { WifiInputPanel } from './WifiInputPanel';
import { VCardInputPanel } from './VCardInputPanel';
import { TextInputPanel } from './TextInputPanel';
import { SmsInputPanel } from './SmsInputPanel';

export const PayloadSection: React.FC = () => {
  const { payloadType } = useQRStore();

  return (
    <div className="p-5 rounded-xl bg-surface-card border border-border-subtle shadow-md space-y-5">
      <PayloadTabs />

      <div className="pt-1">
        {payloadType === 'url' && <UrlInputPanel />}
        {payloadType === 'wifi' && <WifiInputPanel />}
        {payloadType === 'vcard' && <VCardInputPanel />}
        {payloadType === 'text' && <TextInputPanel />}
        {payloadType === 'sms' && <SmsInputPanel />}
      </div>
    </div>
  );
};
