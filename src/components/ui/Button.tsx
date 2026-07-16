import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white focus:ring-brand-500 shadow-sm shadow-brand-500/10',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100',
    outline: 'border border-slate-300 hover:bg-slate-50 text-slate-700 focus:ring-brand-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800',
    ghost: 'hover:bg-slate-100 text-slate-700 focus:ring-slate-400 dark:hover:bg-zinc-800 dark:text-zinc-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm shadow-red-500/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  const currentVariantClass = variants[variant] || variants.primary;
  const currentSizeClass = sizes[size] || sizes.md;

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: 1.01 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.99 }}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${currentVariantClass} ${currentSizeClass} ${className}`}
      {...(props as any)}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
};

export default Button;
