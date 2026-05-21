'use client';

import { useActivityStore } from '@/store/useActivityStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityIcon, AlertCircleIcon, BellIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const LiveActivityFeed = () => {
  const activities = useActivityStore((state) => state.activities);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full max-h-[600px]">
      <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50">
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <ActivityIcon className="w-4 h-4 text-blue-600" />
          Live Event Feed
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          <AnimatePresence initial={false}>
            {activities.map((activity) => {
              const isSystem = activity.type === 'system';
              const isCreate = activity.type === 'created';
              
              return (
                <motion.li
                  key={activity.id}
                  layout
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`p-3 rounded-lg text-sm flex gap-3 items-start transition-colors hover:bg-slate-50`}
                >
                  <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    isSystem ? 'bg-slate-100 text-slate-500' : 
                    isCreate ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {isSystem ? <ActivityIcon className="w-3 h-3" /> : 
                     isCreate ? <BellIcon className="w-3 h-3" /> : <AlertCircleIcon className="w-3 h-3" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-700 font-medium">{activity.message}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};
