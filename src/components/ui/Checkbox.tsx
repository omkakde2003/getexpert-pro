import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            ref={ref}
            type="checkbox"
            className={`w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500/20 mt-0.5 accent-brand-600 cursor-pointer ${className}`}
            {...props}
          />
          {label && (
            <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              {label}
            </span>
          )}
        </label>
        {error && <p className="text-[11px] text-red-500 font-medium pl-6.5">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
