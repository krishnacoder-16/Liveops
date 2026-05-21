import { InboxIcon } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg border-slate-200 bg-slate-50 border-dashed">
      <InboxIcon className="w-12 h-12 text-slate-400 mb-4" />
      <h3 className="text-lg font-medium text-slate-900">No active tickets</h3>
      <p className="mt-1 text-sm text-slate-500">
        You&apos;re all caught up! New incoming support requests will appear here instantly.
      </p>
    </div>
  );
};
