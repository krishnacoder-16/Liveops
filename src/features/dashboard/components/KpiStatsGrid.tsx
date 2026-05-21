'use client';

import { useTicketStore } from '@/store/useTicketStore';
import { AlertCircleIcon, CheckCircle2Icon, ClockIcon, TicketIcon } from 'lucide-react';

export const KpiStatsGrid = () => {
  const tickets = useTicketStore((state) => state.tickets);
  
  const activeCount = tickets.filter(t => t.status !== 'resolved').length;
  const criticalCount = tickets.filter(t => t.priority === 'critical' && t.status !== 'resolved').length;
  const inProgressCount = tickets.filter(t => t.status === 'in_progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;

  const kpis = [
    { label: 'Active Tickets', value: activeCount, icon: TicketIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Critical Issues', value: criticalCount, icon: AlertCircleIcon, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'In Progress', value: inProgressCount, icon: ClockIcon, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Resolved (24h)', value: resolvedCount, icon: CheckCircle2Icon, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, i) => (
        <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${kpi.bg}`}>
            <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{kpi.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
