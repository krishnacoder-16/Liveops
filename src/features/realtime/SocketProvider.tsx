'use client';

import { useEffect } from 'react';
import { getSocket } from '@/lib/socket';
import { useRealtimeStore } from '@/store/useRealtimeStore';
import { useActivityStore } from '@/store/useActivityStore';
import { SOCKET_EVENTS } from '@/lib/constants';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { setConnected, setError } = useRealtimeStore();
  const { addActivity } = useActivityStore();

  useEffect(() => {
    const socket = getSocket();
    
    socket.connect();

    const onConnect = () => {
      setConnected(true);
      setError(null);
      addActivity({ message: 'Realtime synchronization restored', type: 'system' });
    };

    const onDisconnect = () => {
      setConnected(false);
      addActivity({ message: 'Connection to Dispatch Network lost', type: 'system' });
    };

    const onConnectError = (err: Error) => {
      setConnected(false);
      setError(err.message);
    };

    socket.on(SOCKET_EVENTS.CONNECT, onConnect);
    socket.on(SOCKET_EVENTS.DISCONNECT, onDisconnect);
    socket.on(SOCKET_EVENTS.CONNECT_ERROR, onConnectError);

    return () => {
      socket.off(SOCKET_EVENTS.CONNECT, onConnect);
      socket.off(SOCKET_EVENTS.DISCONNECT, onDisconnect);
      socket.off(SOCKET_EVENTS.CONNECT_ERROR, onConnectError);
      socket.disconnect();
    };
  }, [setConnected, setError]);

  return <>{children}</>;
};
