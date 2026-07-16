import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-slate-400 dark:text-zinc-500 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full text-sm py-2 px-3 rounded-lg border bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-zinc-800
              ${leftIcon ? 'pl-9' : ''}
              ${rightIcon ? 'pr-9' : ''}
              ${
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 dark:border-zinc-700 focus:border-brand-500 focus:ring-brand-500/20'
              }
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-slate-400 dark:text-zinc-500 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-[11px] text-red-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-500 dark:text-zinc-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
