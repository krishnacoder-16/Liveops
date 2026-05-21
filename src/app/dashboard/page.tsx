import { LiveTicketBoard } from '@/features/tickets/components/LiveTicketBoard';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { KpiStatsGrid } from '@/features/dashboard/components/KpiStatsGrid';
import { LiveActivityFeed } from '@/features/dashboard/components/LiveActivityFeed';

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto">
          {/* KPI Statistics */}
          <KpiStatsGrid />
          
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Ticket Board */}
            <section className="xl:col-span-3">
              <LiveTicketBoard />
            </section>

            {/* Live Activity Feed */}
            <aside className="xl:col-span-1">
              <LiveActivityFeed />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
