import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { ConnectionBanner } from "@/components/layout/ConnectionBanner";
import { TicketSocketManager } from '@/features/tickets/components/TicketSocketManager';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <TicketSocketManager />
      <DashboardSidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen bg-slate-50/50">
        <ConnectionBanner />
        {children}
      </div>
    </div>
  );
}
