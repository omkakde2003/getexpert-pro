import React from 'react';
import Skeleton from '../feedback/Skeleton';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyState?: React.ReactNode;
}

export function Table<T>({
  columns,
  data,
  isLoading = false,
  emptyState,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
      <table className="w-full border-collapse text-left text-sm text-slate-500 dark:text-zinc-400">
        <thead className="bg-slate-50 dark:bg-zinc-900/50 text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider border-b border-slate-200 dark:border-zinc-800">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} scope="col" className={`px-6 py-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-zinc-800">
          {isLoading ? (
            // Skeleton Loader States
            Array.from({ length: 4 }).map((_, rIdx) => (
              <tr key={rIdx}>
                {columns.map((_, cIdx) => (
                  <td key={cIdx} className="px-6 py-4">
                    <Skeleton variant="text" width="80%" height={16} />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-10 px-6">
                {emptyState || (
                  <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
                    No records found
                  </p>
                )}
              </td>
            </tr>
          ) : (
            data.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors"
              >
                {columns.map((col, cIdx) => {
                  const content =
                    typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : (row[col.accessor] as React.ReactNode);

                  return (
                    <td
                      key={cIdx}
                      className={`px-6 py-4 text-slate-900 dark:text-slate-100 font-medium ${
                        col.className || ''
                      }`}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
