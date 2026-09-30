import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  subtitle,
  icon,
  defaultOpen = false,
  badge,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl bg-surface-card border border-border-subtle shadow-md overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4.5 sm:p-5 flex items-center justify-between text-left transition-colors relative ${
          isOpen ? 'bg-surface-hover/40' : 'hover:bg-surface-hover/20'
        }`}
      >
        {/* Left active border indicator */}
        {isOpen && (
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r" />
        )}

        <div className="flex items-center gap-3.5 pr-2">
          {icon && (
            <div className={`p-2 rounded-lg ${isOpen ? 'bg-primary/20 text-primary-light' : 'bg-surface-hover text-slate-300'}`}>
              {icon}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
              {badge}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5 leading-snug line-clamp-1">{subtitle}</p>
            )}
          </div>
        </div>

        <div className={`p-1 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary-light' : ''}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {isOpen && (
        <div className="p-4.5 sm:p-5 pt-3 border-t border-border-subtle/80 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};
