import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverGlow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverGlow = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs transition-all duration-300
        ${hoverGlow ? 'hover:shadow-md hover:border-brand-500/30' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
