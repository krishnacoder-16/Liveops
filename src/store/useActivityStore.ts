import { create } from 'zustand';

export interface ActivityEvent {
  id: string;
  message: string;
  timestamp: string;
  type: 'created' | 'updated' | 'system';
}

interface ActivityState {
  activities: ActivityEvent[];
  addActivity: (activity: Omit<ActivityEvent, 'id' | 'timestamp'>) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [
    { id: 'initial-1', message: 'System connected to dispatch', timestamp: new Date().toISOString(), type: 'system' }
  ],
  addActivity: (activity) => 
    set((state) => {
      const newActivity = {
        ...activity,
        id: `act-${Math.random().toString(36).substring(2, 9)}`,
        timestamp: new Date().toISOString()
      };
      // Keep only the latest 15 activities to avoid memory bloat
      return { activities: [newActivity, ...state.activities].slice(0, 15) };
    }),
}));
