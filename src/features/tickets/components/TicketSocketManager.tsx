'use client';

import { useEffect } from 'react';
import { getSocket } from '@/lib/socket';
import { useTicketStore } from '@/store/useTicketStore';
import { Ticket } from '@/features/tickets/types';

export const TicketSocketManager = () => {
  const { addTicket, updateTicket } = useTicketStore();

  useEffect(() => {
    const socket = getSocket();

    const handleTicketCreated = (ticket: Ticket) => {
      console.log('Received ticket_created', ticket);
      addTicket(ticket);
    };

    const handleTicketUpdated = (ticket: Partial<Ticket> & { id: string }) => {
      console.log('Received ticket_updated', ticket);
      updateTicket(ticket.id, ticket);
    };

    socket.on('ticket:created', handleTicketCreated);
    socket.on('ticket:updated', handleTicketUpdated);

    return () => {
      socket.off('ticket:created', handleTicketCreated);
      socket.off('ticket:updated', handleTicketUpdated);
    };
  }, [addTicket, updateTicket]);

  return null; // Invisible component
};
