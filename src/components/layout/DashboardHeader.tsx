import { LiveConnectionBadge } from '@/components/shared/LiveConnectionBadge';

export const DashboardHeader = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Realtime Overview</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Global Freight & Operations Command</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-xs text-slate-500 font-medium">
          <span className="text-slate-400 mr-1">Timezone:</span> UTC
        </div>
        <div className="w-px h-4 bg-slate-200"></div>
        <LiveConnectionBadge />
      </div>
    </header>
  );
};
