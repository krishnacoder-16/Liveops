'use client';

import { useRealtimeStore } from '@/store/useRealtimeStore';
import { cn } from '@/lib/utils';
import { WifiIcon, WifiOffIcon } from 'lucide-react';

export const LiveConnectionBadge = () => {
  const isConnected = useRealtimeStore((state) => state.isConnected);

  return (
    <div className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-full px-3 py-1.5">
      <div className="relative flex items-center justify-center">
        <span 
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75",
            isConnected ? "bg-green-400 animate-ping" : "bg-amber-400 animate-none hidden"
          )} 
        />
        <span 
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            isConnected ? "bg-green-500" : "bg-amber-500"
          )} 
        />
      </div>
      <span className="text-xs font-medium text-slate-700">
        {isConnected ? 'System Live' : 'Reconnecting...'}
      </span>
      {isConnected ? (
        <WifiIcon className="w-3.5 h-3.5 text-green-600" />
      ) : (
        <WifiOffIcon className="w-3.5 h-3.5 text-amber-500" />
      )}
    </div>
  );
};
