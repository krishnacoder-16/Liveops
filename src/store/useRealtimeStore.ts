import { create } from 'zustand';

interface RealtimeState {
  isConnected: boolean;
  error: string | null;
  agentName: string;
  setConnected: (status: boolean) => void;
  setError: (error: string | null) => void;
  setAgentName: (name: string) => void;
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  isConnected: false,
  error: null,
  agentName: 'Sarah', // Default agent
  setConnected: (status) => set({ isConnected: status }),
  setError: (error) => set({ error }),
  setAgentName: (name) => set({ agentName: name }),
}));
