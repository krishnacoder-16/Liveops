export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
  TICKET_LOCKED: 'ticket:locked',
  TICKET_UNLOCKED: 'ticket:unlocked',
  TICKET_UPDATED: 'ticket:updated',
} as const;
