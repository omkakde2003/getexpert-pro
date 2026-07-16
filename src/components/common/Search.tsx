import React from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder = 'Search records...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center w-full max-w-sm ${className}`}>
      <div className="absolute left-3 text-slate-400 dark:text-zinc-500 pointer-events-none">
        <SearchIcon className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-sm py-2 pl-9 pr-8 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 transition focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default Search;
