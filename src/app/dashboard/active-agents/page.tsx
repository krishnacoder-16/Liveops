import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { ActiveAgentGrid } from '@/features/dashboard/components/ActiveAgentGrid';

export default function ActiveAgentsPage() {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Active Presence</h1>
            <p className="text-sm text-slate-500 mt-1">Monitor realtime operator activity and lock distribution.</p>
          </div>
          
          <ActiveAgentGrid />
        </div>
      </main>
    </>
  );
}
