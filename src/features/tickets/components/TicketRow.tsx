import { Ticket } from '@/features/tickets/types';
import { TicketStatusBadge } from './TicketStatusBadge';
import { ClockIcon, UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface TicketRowProps {
  ticket: Ticket;
}

export const TicketRow = ({ ticket }: TicketRowProps) => {
  const timeString = new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const isCritical = ticket.priority === 'critical' && ticket.status !== 'resolved';

  return (
    <motion.tr 
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`hover:bg-slate-50 hover:-translate-y-[1px] hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] transition-all duration-200 border-b border-slate-100 last:border-0 group relative z-0 hover:z-10 bg-white ${
        isCritical ? 'bg-red-50/20 hover:bg-red-50/40' : ''
      }`}
    >
      <td className="px-5 py-3 whitespace-nowrap relative">
        {/* Left critical indicator border */}
        {isCritical && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[2px_0_8px_rgba(239,68,68,0.4)]" />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors font-mono tracking-tight">
            {ticket.id}
          </span>
          <span suppressHydrationWarning className="text-xs text-slate-500 flex items-center mt-0.5 font-medium">
            <ClockIcon className="w-3 h-3 mr-1 opacity-70" />
            {timeString}
          </span>
        </div>
      </td>
      <td className="px-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mr-2.5 group-hover:border-blue-200 transition-colors">
            <UserIcon className="w-3 h-3 text-slate-500 group-hover:text-blue-500 transition-colors" />
          </div>
          <span className="text-sm text-slate-700 font-medium">{ticket.customerName}</span>
        </div>
      </td>
      <td className="px-5 py-3 whitespace-nowrap">
        <span className="text-sm text-slate-600 font-medium">{ticket.issueType}</span>
      </td>
      <td className="px-5 py-3 whitespace-nowrap">
        <TicketStatusBadge priority={ticket.priority} />
      </td>
      <td className="px-5 py-3 whitespace-nowrap text-right">
        <TicketStatusBadge status={ticket.status} />
      </td>
    </motion.tr>
  );
};
