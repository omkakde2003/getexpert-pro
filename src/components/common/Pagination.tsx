import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-b-xl">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-500">
            Showing Page <span className="font-bold text-slate-800 dark:text-zinc-200">{currentPage}</span> of{' '}
            <span className="font-bold text-slate-800 dark:text-zinc-200">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-850 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={idx}
                  onClick={() => onPageChange(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-semibold cursor-pointer
                    ${
                      isActive
                        ? 'z-10 bg-brand-600 border-brand-600 text-white focus-visible:outline focus-visible:outline-2'
                        : 'border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-855'
                    }
                  `}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-850 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
