'use client';

import { useTicketStore } from '@/store/useTicketStore';
import { KpiStatsGrid } from '@/features/dashboard/components/KpiStatsGrid';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const STATUS_COLORS = {
  open: '#slate-300', // mapped dynamically
  in_progress: '#3b82f6', // blue-500
  resolved: '#10b981', // emerald-500
};

const PRIORITY_COLORS = {
  low: '#94a3b8', // slate-400
  medium: '#f59e0b', // amber-500
  high: '#ef4444', // red-500
  critical: '#991b1b', // red-800
};

export const AnalyticsDashboard = () => {
  const { tickets } = useTicketStore();

  // Compute Status Data
  const statusCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = [
    { name: 'Open', value: statusCounts['open'] || 0, color: '#94a3b8' },
    { name: 'In Progress', value: statusCounts['in_progress'] || 0, color: '#3b82f6' },
    { name: 'Resolved', value: statusCounts['resolved'] || 0, color: '#10b981' },
  ];

  // Compute Priority Data
  const priorityCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityData = [
    { name: 'Low', count: priorityCounts['low'] || 0, fill: PRIORITY_COLORS.low },
    { name: 'Medium', count: priorityCounts['medium'] || 0, fill: PRIORITY_COLORS.medium },
    { name: 'High', count: priorityCounts['high'] || 0, fill: PRIORITY_COLORS.high },
    { name: 'Critical', count: priorityCounts['critical'] || 0, fill: PRIORITY_COLORS.critical },
  ];

  return (
    <div className="space-y-6">
      {/* Top Level KPIs */}
      <KpiStatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution (Pie Chart) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-[400px]"
        >
          <h3 className="text-sm font-semibold text-slate-900 tracking-tight mb-6">Operations by Status</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={800}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></div>
                <span className="text-xs font-medium text-slate-600">{s.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Priority Distribution (Bar Chart) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-[400px]"
        >
          <h3 className="text-sm font-semibold text-slate-900 tracking-tight mb-6">Active Threats by Priority</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} animationDuration={800}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
