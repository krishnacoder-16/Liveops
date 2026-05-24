'use client';

import { useTicketStore } from '@/store/useTicketStore';
import { TicketRow } from '@/features/tickets/components/TicketRow';
import { EmptyState } from '@/features/tickets/components/EmptyState';
import { useState } from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';

export const TicketManagementView = () => {
  const { tickets } = useTicketStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
      <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
        <div>
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">Ticket Management</h2>
          <p className="text-xs text-slate-500 mt-1">Showing {filteredTickets.length} of {tickets.length} total tickets</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search ID or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64 transition-shadow"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>
      
      {filteredTickets.length === 0 ? (
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
              {filteredTickets.map((ticket) => (
                <TicketRow key={ticket.id} ticket={ticket} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
