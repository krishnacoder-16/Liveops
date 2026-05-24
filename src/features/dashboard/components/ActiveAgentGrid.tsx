'use client';

import { useTicketStore } from '@/store/useTicketStore';
import { useRealtimeStore } from '@/store/useRealtimeStore';
import { UserIcon, ClockIcon, LockIcon, CircleIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ALL_AGENTS = ['Sarah', 'Marcus', 'Alex', 'Olivia'];

export const ActiveAgentGrid = () => {
  const { tickets } = useTicketStore();
  const { agentName: myAgentName, isConnected } = useRealtimeStore();

  const agents = ALL_AGENTS.map(agentName => {
    const activeLock = tickets.find(t => t.isLocked && t.lockedBy === agentName);
    const isMe = agentName === myAgentName;
    
    // If it's me, my online status strictly matches the socket. Otherwise, we simulate online for demo.
    const isOnline = isMe ? isConnected : true;

    return {
      name: agentName,
      isMe,
      isOnline,
      activeLock,
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {agents.map((agent, idx) => (
        <motion.div
          key={agent.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col relative overflow-hidden"
        >
          {agent.isMe && (
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          )}
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-slate-500" />
                </div>
                {agent.isOnline ? (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full">
                    <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
                  </span>
                ) : (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-slate-400 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  {agent.name}
                  {agent.isMe && <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">You</span>}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {agent.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-slate-100">
            {agent.activeLock ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-amber-800 flex items-center mb-1">
                  <LockIcon className="w-3 h-3 mr-1.5" />
                  Currently Editing
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-mono font-bold text-amber-900">{agent.activeLock.id}</span>
                  <span className="text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">{agent.activeLock.priority}</span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-center text-slate-400 gap-2 h-[68px]">
                <ClockIcon className="w-4 h-4 opacity-50" />
                <span className="text-xs font-medium">Idle / Monitoring</span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
