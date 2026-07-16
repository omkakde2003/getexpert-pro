import React from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`border-b border-slate-200 dark:border-zinc-800 ${className}`}>
      <nav className="-mb-px flex space-x-6" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative py-3 px-1 text-sm font-semibold transition border-b-2 border-transparent cursor-pointer whitespace-nowrap
                ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 font-bold'
                    : 'text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                }
              `}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 dark:bg-brand-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;
