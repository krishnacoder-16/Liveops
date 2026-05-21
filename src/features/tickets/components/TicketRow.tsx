import { Ticket } from '@/features/tickets/types';
import { TicketStatusBadge } from './TicketStatusBadge';
import { ClockIcon, UserIcon } from 'lucide-react';

interface TicketRowProps {
  ticket: Ticket;
}

export const TicketRow = ({ ticket }: TicketRowProps) => {
  const timeString = new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const isCritical = ticket.priority === 'critical' && ticket.status !== 'resolved';

  return (
    <tr 
      className={`hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 group relative ${
        isCritical ? 'bg-red-50/10 hover:bg-red-50/30' : ''
      }`}
    >
      <td className="px-6 py-4 whitespace-nowrap relative">
        {/* Left critical indicator border */}
        {isCritical && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
            {ticket.id}
          </span>
          <span suppressHydrationWarning className="text-xs text-slate-500 flex items-center mt-1 font-medium">
            <ClockIcon className="w-3 h-3 mr-1 opacity-70" />
            {timeString}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mr-3">
            <UserIcon className="w-3 h-3 text-slate-500" />
          </div>
          <span className="text-sm text-slate-700 font-medium">{ticket.customerName}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-slate-700 font-medium">{ticket.issueType}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <TicketStatusBadge priority={ticket.priority} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <TicketStatusBadge status={ticket.status} />
      </td>
    </tr>
  );
};
