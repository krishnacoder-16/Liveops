import { Ticket } from '@/features/tickets/types';
import { TicketStatusBadge } from './TicketStatusBadge';
import { ClockIcon, UserIcon, LockIcon, Edit2Icon, UnlockIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRealtimeStore } from '@/store/useRealtimeStore';
import { getSocket } from '@/lib/socket';

interface TicketRowProps {
  ticket: Ticket;
}

export const TicketRow = ({ ticket }: TicketRowProps) => {
  const timeString = new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const isCritical = ticket.priority === 'critical' && ticket.status !== 'resolved';
  const { agentName } = useRealtimeStore();

  const handleLockTicket = () => {
    if (ticket.isLocked) return;
    const socket = getSocket();
    socket.emit('ticket:lock', { ticketId: ticket.id, agentName });
  };

  const handleUnlockTicket = () => {
    if (!ticket.isLocked) return;
    const socket = getSocket();
    socket.emit('ticket:unlock', { ticketId: ticket.id });
  };

  const isLockedByMe = ticket.isLocked && ticket.lockedBy === agentName;
  const isLockedByOther = ticket.isLocked && !isLockedByMe;

  return (
    <motion.tr 
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`hover:-translate-y-[1px] hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] transition-all duration-200 border-b border-slate-100 last:border-0 group relative z-0 hover:z-10 ${
        isLockedByOther ? 'bg-slate-50/50 grayscale-[20%] opacity-80' : 'bg-white hover:bg-slate-50'
      } ${
        isCritical && !isLockedByOther ? 'bg-red-50/20 hover:bg-red-50/40' : ''
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
      <td className="px-5 py-3 whitespace-nowrap">
        <div className="flex items-center justify-end gap-3">
          <TicketStatusBadge status={ticket.status} />
          <div className="w-px h-4 bg-slate-200"></div>
          {isLockedByMe ? (
            <div className="w-28 flex justify-end">
              <button 
                onClick={handleUnlockTicket}
                className="bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 text-emerald-700 px-3 py-1 rounded-md text-xs font-semibold flex items-center shadow-sm transition-colors"
              >
                <UnlockIcon className="w-3.5 h-3.5 mr-1" />
                Release Lock
              </button>
            </div>
          ) : ticket.isLocked ? (
            <div className="flex items-center justify-end text-slate-500 w-28">
              <span className="text-[11px] font-semibold bg-slate-100 px-2 py-1 rounded-md border border-slate-200 flex items-center shadow-sm whitespace-nowrap">
                <LockIcon className="w-3 h-3 mr-1.5" />
                {ticket.lockedBy}
              </span>
            </div>
          ) : (
            <div className="w-28 flex justify-end">
              <button 
                onClick={handleLockTicket}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-600 px-3 py-1 rounded-md text-xs font-semibold flex items-center shadow-sm"
              >
                <Edit2Icon className="w-3.5 h-3.5 mr-1" />
                Edit
              </button>
            </div>
          )}
        </div>
      </td>
    </motion.tr>
  );
};
