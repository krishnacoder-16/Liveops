'use client';

import { useEffect } from 'react';
import { getSocket } from '@/lib/socket';
import { useTicketStore } from '@/store/useTicketStore';
import { useActivityStore } from '@/store/useActivityStore';
import { Ticket } from '@/features/tickets/types';
import { toast } from 'sonner';

interface TicketLockedPayload {
  ticketId: string;
  lockedBy: string;
  lockedBySocketId: string;
}

interface TicketLockFailedPayload {
  ticketId: string;
  lockedBy: string;
  attemptedBy: string;
}

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

    const handleTicketLocked = ({ ticketId, lockedBy, lockedBySocketId }: TicketLockedPayload) => {
      updateTicket(ticketId, { isLocked: true, lockedBy, lockedBySocketId });
      addActivity({ message: `${lockedBy} locked Ticket ${ticketId}`, type: 'system' });
      toast.info(`Ticket ${ticketId} locked by ${lockedBy}`);
    };

    const handleTicketLockFailed = ({ ticketId, lockedBy, attemptedBy }: TicketLockFailedPayload) => {
      addActivity({ message: `${attemptedBy} attempted to access locked ticket ${ticketId}`, type: 'system' });
      toast.error(`Ticket ${ticketId} is already locked by ${lockedBy}`);
    };

    socket.on('ticket:created', handleTicketCreated);
    socket.on('ticket:updated', handleTicketUpdated);
    socket.on('ticket:locked', handleTicketLocked);
    socket.on('ticket:lock_failed', handleTicketLockFailed);

    return () => {
      socket.off('ticket:created', handleTicketCreated);
      socket.off('ticket:updated', handleTicketUpdated);
      socket.off('ticket:locked', handleTicketLocked);
      socket.off('ticket:lock_failed', handleTicketLockFailed);
    };
  }, [addTicket, updateTicket, addActivity]);

  return null; // Invisible component
};
