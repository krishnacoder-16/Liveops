'use client';

import { useTicketStore } from '@/store/useTicketStore';
import { TicketRow } from './TicketRow';
import { EmptyState } from './EmptyState';
import { getSocket } from '@/lib/socket';
import { PlusIcon } from 'lucide-react';

export const LiveTicketBoard = () => {
  const { tickets } = useTicketStore();

  const simulateNewTicket = () => {
    const newId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const priorities = ['low', 'medium', 'high', 'critical'] as const;
    const priority = priorities[Math.floor(Math.random() * priorities.length)];

    const mockTicket = {
      id: newId,
      customerName: 'Demo Logistics ' + Math.floor(Math.random() * 100),
      issueType: 'Customs Delay',
      priority,
      status: 'open' as const,
      createdAt: new Date().toISOString(),
    };
    
    const socket = getSocket();
    socket.emit('ticket:create', mockTicket);
    useTicketStore.getState().addTicket(mockTicket);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white">
        <div>
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">Active Operations</h2>
        </div>
        <button 
          onClick={simulateNewTicket}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-95"
        >
          <PlusIcon className="w-4 h-4" />
          Inject Test Ticket
        </button>
      </div>
      
      {tickets.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-5 py-3 font-semibold">Ticket ID</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Issue Type</th>
                <th className="px-5 py-3 font-semibold">Priority</th>
                <th className="px-5 py-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map((ticket) => (
                <TicketRow key={ticket.id} ticket={ticket} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
