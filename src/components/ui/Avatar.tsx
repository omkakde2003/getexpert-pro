import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
}) => {
  const [error, setError] = useState(false);

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const currentSizeClass = sizes[size] || sizes.md;

  if (src && !error) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setError(true)}
        className={`${currentSizeClass} rounded-full object-cover border border-slate-200 dark:border-zinc-700 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${currentSizeClass} rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-brand-500 to-indigo-600 text-white select-none ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
