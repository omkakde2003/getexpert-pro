import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 text-xs font-semibold text-slate-500 dark:text-zinc-500">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center hover:text-brand-600 dark:hover:text-brand-400 transition"
          >
            <Home className="w-3.5 h-3.5 mr-1.5" />
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1" />
              {isLast || !item.path ? (
                <span className="text-slate-800 dark:text-zinc-200" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
