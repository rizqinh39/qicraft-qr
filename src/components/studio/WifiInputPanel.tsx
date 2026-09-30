import React, { useState } from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { Wifi, Eye, EyeOff, Lock, EyeClosed } from 'lucide-react';

export const WifiInputPanel: React.FC = () => {
  const { wifiPayload, setWifiPayload } = useQRStore();
  const { locale } = useUIStore();
  const [showPassword, setShowPassword] = useState(false);

  const encryptionOptions: Array<{ id: 'WPA' | 'WEP' | 'nopass'; label: string }> = [
    { id: 'WPA', label: 'WPA / WPA2 / WPA3' },
    { id: 'WEP', label: 'WEP' },
    { id: 'nopass', label: 'None (Open)' },
  ];

  return (
    <div className="space-y-4">
      {/* SSID */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5 text-primary-light" />
          {t('field.wifi.ssid', locale)}
        </label>
        <input
          type="text"
          value={wifiPayload.ssid}
          onChange={(e) => setWifiPayload({ ssid: e.target.value })}
          placeholder="e.g. CafeGuest_5GHz"
          className="w-full px-3.5 py-2.5 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
      </div>

      {/* Encryption Type */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-1.5">
          {t('field.wifi.encryption', locale)}
        </label>
        <div className="grid grid-cols-3 gap-2 p-1 rounded-lg bg-bg-base border border-border-subtle">
          {encryptionOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setWifiPayload({ encryption: opt.id })}
              className={`py-1.5 px-2 rounded-md text-xs font-semibold transition-all ${
                wifiPayload.encryption === opt.id
                  ? 'bg-surface-active text-white border border-primary/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Password (if not open) */}
      {wifiPayload.encryption !== 'nopass' && (
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-primary-light" />
            {t('field.wifi.password', locale)}
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={wifiPayload.password || ''}
              onChange={(e) => setWifiPayload({ password: e.target.value })}
              placeholder="Wi-Fi Security Key"
              className="w-full pl-3.5 pr-10 py-2.5 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Hidden SSID checkbox */}
      <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
        <input
          type="checkbox"
          checked={Boolean(wifiPayload.hidden)}
          onChange={(e) => setWifiPayload({ hidden: e.target.checked })}
          className="w-4 h-4 rounded border-border-subtle bg-bg-base text-primary focus:ring-primary"
        />
        <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
          <EyeClosed className="w-3.5 h-3.5 text-slate-400" />
          {t('field.wifi.hidden', locale)}
        </span>
      </label>
    </div>
  );
};
