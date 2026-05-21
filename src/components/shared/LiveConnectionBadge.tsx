'use client';

import { useRealtimeStore } from '@/store/useRealtimeStore';
import { cn } from '@/lib/utils';
import { NetworkIcon, WifiOffIcon } from 'lucide-react';

export const LiveConnectionBadge = () => {
  const isConnected = useRealtimeStore((state) => state.isConnected);

  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 shadow-sm rounded-full px-3 py-1.5 transition-colors">
      <div className="relative flex items-center justify-center">
        <span 
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-60",
            isConnected ? "bg-emerald-400 animate-[ping_2s_ease-in-out_infinite]" : "bg-amber-400 animate-none hidden"
          )} 
        />
        <span 
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            isConnected ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-amber-500"
          )} 
        />
      </div>
      <span className="text-xs font-semibold text-slate-700 tracking-tight">
        {isConnected ? 'Connected to Dispatch Network' : 'Reconnecting to network...'}
      </span>
      {isConnected ? (
        <NetworkIcon className="w-3.5 h-3.5 text-emerald-600 ml-0.5" />
      ) : (
        <WifiOffIcon className="w-3.5 h-3.5 text-amber-500 ml-0.5" />
      )}
    </div>
  );
};
