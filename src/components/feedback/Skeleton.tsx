import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
}) => {
  const styles: React.CSSProperties = {
    width: width,
    height: height,
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded h-4 w-full';
      case 'rectangular':
      default:
        return 'rounded-lg';
    }
  };

  return (
    <div
      style={styles}
      className={`animate-shimmer bg-slate-200 dark:bg-zinc-800 ${getVariantClass()} ${className}`}
    />
  );
};

export default Skeleton;
