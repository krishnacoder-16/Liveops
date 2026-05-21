import { useEffect } from 'react';
import { getSocket } from '@/lib/socket';


export const useSocket = <T,>(event: string, callback: (data: T) => void) => {
  useEffect(() => {
    const socket = getSocket();
    
    socket.on(event, callback);
    
    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);
  
  return { socket: getSocket() };
};
