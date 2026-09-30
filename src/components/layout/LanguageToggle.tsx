import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { locale, setLocale } = useUIStore();

  const toggleLanguage = () => {
    setLocale(locale === 'id' ? 'en' : 'id');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-surface-card hover:bg-surface-hover border border-border-subtle text-xs font-semibold text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
      title={locale === 'id' ? 'Ganti ke English' : 'Switch to Bahasa Indonesia'}
      aria-label="Toggle Language"
    >
      <Globe className="w-3.5 h-3.5 text-primary-light" />
      <span>{locale.toUpperCase()}</span>
    </button>
  );
};
