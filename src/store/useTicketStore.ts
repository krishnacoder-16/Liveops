import { create } from 'zustand';
import { Ticket, MOCK_TICKETS } from '@/features/tickets/types';

interface TicketState {
  tickets: Ticket[];
  activeTicketId: string | null;
  setTickets: (tickets: Ticket[]) => void;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (id: string, partialTicket: Partial<Ticket>) => void;
  setActiveTicketId: (id: string | null) => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: MOCK_TICKETS,
  activeTicketId: null,
  setTickets: (tickets) => set({ tickets }),
  addTicket: (ticket) => 
    set((state) => ({ 
      // Add new ticket at the top
      tickets: [ticket, ...state.tickets] 
    })),
  updateTicket: (id, partialTicket) => 
    set((state) => ({
      tickets: state.tickets.map((t) => 
        t.id === id ? { ...t, ...partialTicket } : t
      ),
    })),
  setActiveTicketId: (id) => set({ activeTicketId: id }),
}));
