import { useEffect } from 'react';
import { getSocket } from '@/lib/socket';
import { SOCKET_EVENTS } from '@/lib/constants';

export const useSocket = (event: string, callback: (data: any) => void) => {
  useEffect(() => {
    const socket = getSocket();
    
    socket.on(event, callback);
    
    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);
  
  return { socket: getSocket() };
};
