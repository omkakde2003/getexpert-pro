import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'brand' | 'white' | 'slate';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'brand',
  className = '',
}) => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const colors = {
    brand: 'border-brand-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    slate: 'border-slate-500 border-t-transparent dark:border-zinc-400',
  };

  const currentSizeClass = sizes[size] || sizes.md;
  const currentColorClass = colors[color] || colors.brand;

  return (
    <div
      className={`rounded-full animate-spin ${currentSizeClass} ${currentColorClass} ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
