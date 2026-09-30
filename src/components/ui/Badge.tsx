import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'primary';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  icon,
  children,
  className,
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  }[size];

  const variantStyles = {
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/30',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700',
    primary: 'bg-primary/10 text-primary-light border border-primary/30',
  }[variant];

  return (
    <span className={twMerge(clsx(baseStyles, sizeStyles, variantStyles, className))}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
