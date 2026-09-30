import React from 'react';
import { useUIStore, AppView } from '../../store/useUIStore';
import { useQRStore } from '../../store/useQRStore';
import { t } from '../../i18n';
import { BrandLogo } from './BrandLogo';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ShieldCheck, RotateCcw, Sparkles, LayoutTemplate, HelpCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { locale, activeView, setActiveView } = useUIStore();
  const resetDefaults = useQRStore((s) => s.resetDefaults);

  const navItems: Array<{ id: AppView; labelKey: 'nav.generator' | 'nav.templates' | 'nav.howItWorks'; icon: React.ReactNode }> = [
    { id: 'studio', labelKey: 'nav.generator', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'templates', labelKey: 'nav.templates', icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: 'how-it-works', labelKey: 'nav.howItWorks', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-bg-base/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveView('studio')}>
          <BrandLogo size={36} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">QiCraft</span>
              <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-primary/20 text-primary-light border border-primary/30">
                Static
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block -mt-0.5">
              {t('brand.tagline', locale)}
            </p>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-lg bg-surface-card border border-border-subtle">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-surface-hover'
                }`}
              >
                {item.icon}
                <span>{t(item.labelKey, locale)}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <Badge
            variant="success"
            size="sm"
            icon={<ShieldCheck className="w-3.5 h-3.5" />}
            className="hidden sm:inline-flex"
          >
            {t('nav.zeroTelemetry', locale)}
          </Badge>

          {activeView === 'studio' && (
            <Button
              variant="ghost"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={resetDefaults}
              className="hidden lg:inline-flex text-slate-300"
            >
              {t('nav.reset', locale)}
            </Button>
          )}

          <div className="h-5 w-[1px] bg-border-subtle hidden sm:block" />

          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden border-t border-border-subtle px-2 py-1.5 bg-surface-card/60 backdrop-blur justify-around">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                isActive ? 'text-primary font-bold bg-primary/10' : 'text-slate-400'
              }`}
            >
              {item.icon}
              <span>{t(item.labelKey, locale)}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
