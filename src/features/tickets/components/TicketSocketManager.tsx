'use client';

import { useEffect } from 'react';
import { getSocket } from '@/lib/socket';
import { useTicketStore } from '@/store/useTicketStore';
import { useActivityStore } from '@/store/useActivityStore';
import { Ticket } from '@/features/tickets/types';

export const TicketSocketManager = () => {
  const { addTicket, updateTicket } = useTicketStore();
  const { addActivity } = useActivityStore();

  useEffect(() => {
    const socket = getSocket();

    const handleTicketCreated = (ticket: Ticket) => {
      addTicket(ticket);
      addActivity({ message: `Ticket ${ticket.id} created`, type: 'created' });
    };

    const handleTicketUpdated = (ticket: Partial<Ticket> & { id: string }) => {
      updateTicket(ticket.id, ticket);
      addActivity({ message: `Ticket ${ticket.id} updated`, type: 'updated' });
    };

    socket.on('ticket:created', handleTicketCreated);
    socket.on('ticket:updated', handleTicketUpdated);

    return () => {
      socket.off('ticket:created', handleTicketCreated);
      socket.off('ticket:updated', handleTicketUpdated);
    };
  }, [addTicket, updateTicket, addActivity]);

  return null; // Invisible component
};
