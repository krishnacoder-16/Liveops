'use client';

import { LiveConnectionBadge } from '@/components/shared/LiveConnectionBadge';
import { useRealtimeStore } from '@/store/useRealtimeStore';
import { UserIcon } from 'lucide-react';

export const DashboardHeader = () => {
  const { agentName, setAgentName } = useRealtimeStore();
  const agents = ['Sarah', 'Marcus', 'Alex', 'Olivia'];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Realtime Overview</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Global Freight & Operations Command</p>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5">
          <UserIcon className="w-4 h-4 text-slate-500" />
          <select 
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="bg-transparent text-sm font-semibold text-slate-700 outline-none cursor-pointer"
          >
            {agents.map(agent => (
              <option key={agent} value={agent}>{agent}</option>
            ))}
          </select>
        </div>
        <div className="w-px h-6 bg-slate-200"></div>
        <div className="text-xs text-slate-500 font-medium">
          <span className="text-slate-400 mr-1">Timezone:</span> UTC
        </div>
        <div className="w-px h-4 bg-slate-200"></div>
        <LiveConnectionBadge />
      </div>
    </header>
  );
};
