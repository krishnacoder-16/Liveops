import { create } from 'zustand';

interface TicketState {
  activeTicketId: string | null;
  setActiveTicketId: (id: string | null) => void;
  // TODO: Add more ticket state
}

export const useTicketStore = create<TicketState>((set) => ({
  activeTicketId: null,
  setActiveTicketId: (id) => set({ activeTicketId: id }),
}));
