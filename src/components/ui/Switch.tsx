import React from 'react';
import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
}) => {
  return (
    <label className={`flex items-center gap-3 select-none ${disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}>
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200
          ${checked ? 'bg-brand-600' : 'bg-slate-300 dark:bg-zinc-700'}
        `}
      >
        <motion.div
          layout
          className="w-4 h-4 bg-white rounded-full shadow-sm"
          animate={{ x: checked ? 16 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      {label && <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">{label}</span>}
    </label>
  );
};

export default Switch;
