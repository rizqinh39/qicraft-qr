import React from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { User, Building, Briefcase, Phone, Mail, Globe, MapPin } from 'lucide-react';

export const VCardInputPanel: React.FC = () => {
  const { vcardPayload, setVcardPayload } = useQRStore();
  const { locale } = useUIStore();

  return (
    <div className="space-y-3.5">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-primary-light" />
            {t('field.vcard.firstName', locale)} *
          </label>
          <input
            type="text"
            value={vcardPayload.firstName}
            onChange={(e) => setVcardPayload({ firstName: e.target.value })}
            placeholder="John"
            className="w-full px-3 py-2 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1">
            {t('field.vcard.lastName', locale)}
          </label>
          <input
            type="text"
            value={vcardPayload.lastName || ''}
            onChange={(e) => setVcardPayload({ lastName: e.target.value })}
            placeholder="Doe"
            className="w-full px-3 py-2 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Organization & Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-primary-light" />
            {t('field.vcard.org', locale)}
          </label>
          <input
            type="text"
            value={vcardPayload.organization || ''}
            onChange={(e) => setVcardPayload({ organization: e.target.value })}
            placeholder="Acme Studio"
            className="w-full px-3 py-2 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-primary-light" />
            {t('field.vcard.title', locale)}
          </label>
          <input
            type="text"
            value={vcardPayload.jobTitle || ''}
            onChange={(e) => setVcardPayload({ jobTitle: e.target.value })}
            placeholder="Lead Designer"
            className="w-full px-3 py-2 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-primary-light" />
            {t('field.vcard.phone', locale)}
          </label>
          <input
            type="tel"
            value={vcardPayload.phone || ''}
            onChange={(e) => setVcardPayload({ phone: e.target.value })}
            placeholder="+123456789"
            className="w-full px-3 py-2 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-primary-light" />
            {t('field.vcard.email', locale)}
          </label>
          <input
            type="email"
            value={vcardPayload.email || ''}
            onChange={(e) => setVcardPayload({ email: e.target.value })}
            placeholder="john@example.com"
            className="w-full px-3 py-2 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Website & Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-primary-light" />
            {t('field.vcard.website', locale)}
          </label>
          <input
            type="url"
            value={vcardPayload.website || ''}
            onChange={(e) => setVcardPayload({ website: e.target.value })}
            placeholder="https://portfolio.com"
            className="w-full px-3 py-2 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary-light" />
            {t('field.vcard.address', locale)}
          </label>
          <input
            type="text"
            value={vcardPayload.address || ''}
            onChange={(e) => setVcardPayload({ address: e.target.value })}
            placeholder="City, Country"
            className="w-full px-3 py-2 rounded-md bg-bg-base border border-border-subtle text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};
