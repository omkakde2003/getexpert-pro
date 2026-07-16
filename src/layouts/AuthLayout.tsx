import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../store';
import { PATHS } from '../constants';

export const AuthLayout: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated && user) {
    // If user is already authenticated, redirect them to their respective portal
    if (user.role === 'admin') return <Navigate to={PATHS.ADMIN_DASHBOARD} replace />;
    if (user.role === 'expert') return <Navigate to={PATHS.EXPERT_DASHBOARD} replace />;
    return <Navigate to={PATHS.CUSTOMER_DASHBOARD} replace />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-radial from-slate-900 via-indigo-950 to-black p-4 relative overflow-hidden select-none">
      {/* Background ambient light effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="w-full max-w-md bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
      >
        {/* Brand Header */}
        <div className="text-center">
          <h2 className="text-2xl font-black tracking-tight text-white">
            GETEXPERT PRO
          </h2>
          <p className="text-xs text-zinc-450 mt-1">
            Enterprise AI-Service Marketplace
          </p>
        </div>

        {/* Layout content outlet */}
        <div className="w-full">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
