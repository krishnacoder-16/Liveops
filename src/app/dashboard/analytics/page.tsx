import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { AnalyticsDashboard } from '@/features/analytics/components/AnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">System Analytics</h1>
            <p className="text-sm text-slate-500 mt-1">Realtime telemetry and logistics command metrics.</p>
          </div>
          
          <AnalyticsDashboard />
        </div>
      </main>
    </>
  );
}
