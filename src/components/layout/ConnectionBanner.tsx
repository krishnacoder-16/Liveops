'use client';

import { useRealtimeStore } from '@/store/useRealtimeStore';
import { AlertOctagonIcon, Loader2Icon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const ConnectionBanner = () => {
  const isConnected = useRealtimeStore((state) => state.isConnected);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!isConnected && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden bg-red-600 text-white shadow-md z-50 relative"
        >
          <div className="flex items-center justify-center gap-3 py-3 px-4 max-w-[1400px] mx-auto text-sm font-semibold tracking-wide">
            <AlertOctagonIcon className="w-5 h-5 text-red-200" />
            <span>Connection Lost: Reconnecting to Dispatch Network...</span>
            <Loader2Icon className="w-4 h-4 animate-spin text-red-200 ml-1" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
