import React from 'react';
import { Inbox } from 'lucide-react';
import Button from '../ui/Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There is no data available to show right now.',
  icon,
  actionLabel,
  onActionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-slate-300 dark:border-zinc-800 rounded-xl text-center">
      <div className="text-slate-400 dark:text-zinc-600 mb-3">
        {icon || <Inbox className="w-10 h-10" />}
      </div>
      <h3 className="text-sm font-semibold text-slate-800 dark:text-zinc-200 mb-1">
        {title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-zinc-500 max-w-sm mb-4">
        {description}
      </p>
      {actionLabel && onActionClick && (
        <Button variant="outline" size="sm" onClick={onActionClick}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
