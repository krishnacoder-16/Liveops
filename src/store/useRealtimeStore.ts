import { create } from 'zustand';

interface RealtimeState {
  isConnected: boolean;
  error: string | null;
  setConnected: (status: boolean) => void;
  setError: (error: string | null) => void;
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  isConnected: false,
  error: null,
  setConnected: (status) => set({ isConnected: status }),
  setError: (error) => set({ error }),
}));
