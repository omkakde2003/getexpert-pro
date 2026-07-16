import React from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-205 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 gap-4 text-xs font-semibold text-slate-500 dark:text-zinc-500">
        <div>
          &copy; {new Date().getFullYear()} GetExpert Pro. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link to={PATHS.PRIVACY} className="hover:underline transition">
            Privacy Policy
          </Link>
          <Link to={PATHS.TERMS} className="hover:underline transition">
            Terms of Service
          </Link>
          <Link to={PATHS.CONTACT} className="hover:underline transition">
            Support Desk
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
