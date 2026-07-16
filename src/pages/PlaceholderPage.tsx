import React from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { Shield, Sparkles } from 'lucide-react';

interface PlaceholderPageProps {
  title?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  const location = useLocation();
  const displayTitle = title || location.pathname.split('/').pop()?.toUpperCase() || 'Page View';

  // Make mock breadcrumb items
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = pathParts.map((part, idx) => ({
    label: part.charAt(0).toUpperCase() + part.slice(1),
    path: '/' + pathParts.slice(0, idx + 1).join('/'),
  }));

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center gap-2 mt-2">
          <h1 className="text-2xl font-black text-slate-800 dark:text-zinc-100 uppercase tracking-tight">
            {displayTitle}
          </h1>
          <Sparkles className="w-5 h-5 text-brand-500 animate-pulse" />
        </div>
        <p className="text-xs text-slate-500 dark:text-zinc-550">
          This view represents the live endpoint template configuration for the path: {location.pathname}
        </p>
      </div>

      {/* Main Panel Placeholder */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Placeholder metric cards */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-800/80 rounded-xl p-5 shadow-xs">
          <h4 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            Diagnostic Health
          </h4>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2 block">
            100%
          </span>
          <span className="text-[10px] text-emerald-500 font-semibold mt-1 block">
            All systems nominal
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-800/80 rounded-xl p-5 shadow-xs">
          <h4 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            API Endpoints Connected
          </h4>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2 block">
            Mock Mode Active
          </span>
          <span className="text-[10px] text-brand-500 font-semibold mt-1 block">
            Dummy data fallbacks verified
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-800/80 rounded-xl p-5 shadow-xs">
          <h4 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            Role Gate Protection
          </h4>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2 block">
            Secure Mode
          </span>
          <span className="text-[10px] text-indigo-500 font-semibold mt-1 block">
            Role authentication enforced
          </span>
        </div>
      </div>

      {/* Detailed Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-800/80 rounded-xl p-6 shadow-xs flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-zinc-200 mb-1">
          {displayTitle} Workspace Scaffolding
        </h3>
        <p className="text-xs text-slate-500 dark:text-zinc-500 max-w-md">
          This page represents the entry interface placeholder. It is fully routed, protected under route-role guards, and is ready for full production UI layouts.
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
