'use client';

import { LiveTicketBoard } from '@/features/tickets/components/LiveTicketBoard';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { KpiStatsGrid } from '@/features/dashboard/components/KpiStatsGrid';
import { LiveActivityFeed } from '@/features/dashboard/components/LiveActivityFeed';
import { useUiStore } from '@/store/useUiStore';

export default function DashboardPage() {
  const { showActivityFeed } = useUiStore();

  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* KPI Statistics */}
          <KpiStatsGrid />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Ticket Board */}
            <div className={`${showActivityFeed ? 'xl:col-span-2' : 'xl:col-span-3'}`}>
              <LiveTicketBoard />
            </div>

            {/* Live Activity Feed */}
            {showActivityFeed && (
              <aside className="xl:col-span-1">
                <LiveActivityFeed />
              </aside>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
