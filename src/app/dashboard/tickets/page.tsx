import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { TicketManagementView } from '@/features/tickets/components/TicketManagementView';

export default function TicketsPage() {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Support Tickets</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and filter all active logistics operations.</p>
          </div>
          
          <TicketManagementView />
        </div>
      </main>
    </>
  );
}
