import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wrench, Shield, Zap, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PATHS } from '../constants';
import Button from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <div className="relative overflow-hidden select-none bg-slate-50 dark:bg-[#09090b]">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-3xl gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-900/30 bg-brand-50/50 dark:bg-brand-500/5 text-xs font-bold text-brand-600 dark:text-brand-400"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            AI-POWERED ONDEMAND SERVICES MARKETPLACE
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight"
          >
            Connect with Elite{' '}
            <span className="bg-gradient-to-r from-brand-500 via-indigo-500 to-indigo-650 bg-clip-text text-transparent text-glow">
              Local Experts
            </span>{' '}
            Instantly
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-500 dark:text-zinc-450 leading-relaxed max-w-2xl"
          >
            Book verified professionals for home repairs, wellness therapies, technical installations, and digital tasks. Automated AI scheduling and real-time messaging built-in.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4 justify-center">
            <Link to={PATHS.REGISTER}>
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get Started Now
              </Button>
            </Link>
            <Link to={PATHS.SERVICES}>
              <Button size="lg" variant="outline">
                Explore Services
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 border-t border-slate-200/60 dark:border-zinc-800/80 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Why Choose GetExpert Pro?
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-550 mt-1.5">
            Designed for convenience, trust, and speed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-zinc-900/50 border border-slate-200/80 dark:border-zinc-800/80 p-6 rounded-xl shadow-xs">
            <div className="w-10 h-10 bg-brand-100 dark:bg-brand-950/20 text-brand-600 dark:text-brand-400 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-zinc-200 mb-2">
              100% Verified Experts
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Every expert goes through strict multi-level background checks, credential verification, and interview audits by our administration team.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-zinc-900/50 border border-slate-200/80 dark:border-zinc-800/80 p-6 rounded-xl shadow-xs">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400 rounded-lg flex items-center justify-center mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-zinc-200 mb-2">
              Diverse Service Catalog
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              From plumber diagnostics to advanced AI smart home configurations, wellness spa treatments, and web integrations.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-zinc-900/50 border border-slate-200/80 dark:border-zinc-800/80 p-6 rounded-xl shadow-xs">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-zinc-200 mb-2">
              Real-time Workflows
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Instant booking, live WebSocket messaging with experts, invoice releases, and dynamic calendar availability syncing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
