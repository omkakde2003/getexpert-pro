import React from 'react';
import { motion } from 'framer-motion';
import Loader from './Loader';

export const SuspenseLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#09090b] z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <Loader size="lg" color="brand" />
        <h3 className="text-sm font-semibold text-slate-600 dark:text-zinc-400 animate-pulse">
          Loading GetExpert Pro...
        </h3>
      </motion.div>
    </div>
  );
};

export default SuspenseLoading;
