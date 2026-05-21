import { TicketPriority, TicketStatus } from '@/features/tickets/types';
import { cn } from '@/lib/utils';

interface TicketStatusBadgeProps {
  status?: TicketStatus;
  priority?: TicketPriority;
}

export const TicketStatusBadge = ({ status, priority }: TicketStatusBadgeProps) => {
  if (status) {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold capitalize border',
          {
            'bg-slate-100 text-slate-700 border-slate-200': status === 'open',
            'bg-blue-50 text-blue-700 border-blue-200': status === 'in_progress',
            'bg-emerald-50 text-emerald-700 border-emerald-200': status === 'resolved',
          }
        )}
      >
        {status.replace('_', ' ')}
      </span>
    );
  }

  if (priority) {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold capitalize border',
          {
            'bg-slate-50 text-slate-600 border-slate-200': priority === 'low',
            'bg-amber-50 text-amber-700 border-amber-200': priority === 'medium',
            'bg-orange-50 text-orange-700 border-orange-200': priority === 'high',
            'bg-red-50 text-red-700 border-red-200 shadow-sm': priority === 'critical',
          }
        )}
      >
        {priority === 'critical' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse" />}
        {priority}
      </span>
    );
  }

  return null;
};
