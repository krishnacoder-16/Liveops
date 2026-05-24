'use client';

import { ActivityIcon, BarChart2Icon, LayoutDashboardIcon, SettingsIcon, TicketIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboardIcon },
  { label: 'Tickets', href: '/dashboard/tickets', icon: TicketIcon },
  { label: 'Active Agents', href: '/dashboard/active-agents', icon: UsersIcon },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart2Icon },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col h-screen fixed top-0 left-0 border-r border-slate-900 z-10">
      <div className="h-16 flex items-center px-6 border-b border-slate-900">
        <div className="flex items-center gap-2 text-white font-semibold">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <ActivityIcon className="w-5 h-5 text-white" />
          </div>
          LiveOps Center
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
          Operations
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                isActive 
                  ? 'bg-slate-900 text-white' 
                  : 'hover:bg-slate-900/50 hover:text-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-500'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-900">
        <Link 
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
            pathname === '/dashboard/settings' 
              ? 'bg-slate-900 text-white' 
              : 'hover:bg-slate-900/50 hover:text-slate-100'
          }`}
        >
          <SettingsIcon className={`w-4 h-4 ${pathname === '/dashboard/settings' ? 'text-blue-500' : 'text-slate-500'}`} />
          Settings
        </Link>
      </div>
    </aside>
  );
};
