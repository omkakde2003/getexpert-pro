import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface RevenueChartProps {
  data: any[];
  xKey?: string;
  yKey?: string;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  xKey = 'month',
  yKey = 'revenue',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? '#27272a' : '#f1f5f9';
  const textColor = isDark ? '#a1a1aa' : '#64748b';

  return (
    <div className="w-full h-80 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-800 dark:text-zinc-200">
          Monthly Revenue Performance
        </h4>
        <p className="text-xs text-slate-500 dark:text-zinc-500">
          Earnings aggregated across all services
        </p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis
            dataKey={xKey}
            stroke={textColor}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={textColor}
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#18181b' : '#ffffff',
              borderColor: isDark ? '#27272a' : '#e2e8f0',
              borderRadius: '8px',
              fontSize: '12px',
              color: isDark ? '#f4f4f5' : '#1e293b',
            }}
          />
          <Area
            type="monotone"
            dataKey={yKey}
            stroke="#8b5cf6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

interface GrowthChartProps {
  data: any[];
  xKey?: string;
  barKey1?: string;
  barKey2?: string;
  label1?: string;
  label2?: string;
}

export const GrowthChart: React.FC<GrowthChartProps> = ({
  data,
  xKey = 'month',
  barKey1 = 'active',
  barKey2 = 'new',
  label1 = 'Active Customers',
  label2 = 'New Signups',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? '#27272a' : '#f1f5f9';
  const textColor = isDark ? '#a1a1aa' : '#64748b';

  return (
    <div className="w-full h-80 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-800 dark:text-zinc-200">
          User Base Analytics
        </h4>
        <p className="text-xs text-slate-500 dark:text-zinc-500">
          Monthly growth and retention diagnostics
        </p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis
            dataKey={xKey}
            stroke={textColor}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke={textColor} fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#18181b' : '#ffffff',
              borderColor: isDark ? '#27272a' : '#e2e8f0',
              borderRadius: '8px',
              fontSize: '12px',
              color: isDark ? '#f4f4f5' : '#1e293b',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
            verticalAlign="bottom"
            height={36}
          />
          <Bar name={label1} dataKey={barKey1} fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar name={label2} dataKey={barKey2} fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
