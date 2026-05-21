import { LiveTicketBoard } from '@/features/tickets/components/LiveTicketBoard';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { KpiStatsGrid } from '@/features/dashboard/components/KpiStatsGrid';

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* KPI Statistics */}
          <KpiStatsGrid />
          
          {/* Ticket Board */}
          <section>
            <LiveTicketBoard />
          </section>
        </div>
      </main>
    </>
  );
}
