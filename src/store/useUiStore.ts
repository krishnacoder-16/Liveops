import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
  isDrawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
  compactMode: boolean;
  setCompactMode: (isCompact: boolean) => void;
  showActivityFeed: boolean;
  setShowActivityFeed: (show: boolean) => void;
  enableAnimations: boolean;
  setEnableAnimations: (enable: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      isDrawerOpen: false,
      setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
      compactMode: false,
      setCompactMode: (isCompact) => set({ compactMode: isCompact }),
      showActivityFeed: true,
      setShowActivityFeed: (show) => set({ showActivityFeed: show }),
      enableAnimations: true,
      setEnableAnimations: (enable) => set({ enableAnimations: enable }),
    }),
    {
      name: 'liveops-ui-preferences',
    }
  )
);
