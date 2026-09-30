import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 rounded-sm gap-1.5',
      md: 'text-sm px-4 py-2 rounded-md gap-2',
      lg: 'text-base px-5 py-2.5 rounded-md gap-2.5',
    }[size];

    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0',
      secondary: 'bg-surface-hover text-slate-200 hover:bg-surface-active hover:text-white border border-border-subtle',
      ghost: 'bg-transparent text-slate-300 hover:bg-surface-hover hover:text-white',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'bg-transparent border border-border-subtle text-slate-200 hover:bg-surface-hover hover:border-slate-500',
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={twMerge(clsx(baseStyles, sizeStyles, variantStyles, className))}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
