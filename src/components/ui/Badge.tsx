import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'accent' | 'warning' | 'success' | 'error' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}: BadgeProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium';
  
  const variants = {
    primary: 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200',
    accent: 'bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200',
    warning: 'bg-warning-100 dark:bg-warning-900 text-warning-800 dark:text-warning-200',
    success: 'bg-success-100 dark:bg-success-900 text-success-800 dark:text-success-200',
    error: 'bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200',
    outline: 'bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
    ghost: 'bg-transparent text-slate-700 dark:text-slate-300',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs rounded-full',
    md: 'px-2.5 py-0.5 text-sm rounded-full',
    lg: 'px-3 py-1 text-base rounded-full',
  };
  
  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;