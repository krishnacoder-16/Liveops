import { ReactNode } from 'react';

interface DiagnosticsRowProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}

export const DiagnosticsRow = ({ label, value, icon }: DiagnosticsRowProps) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-slate-600 font-medium">
        {icon && <span className="text-slate-400">{icon}</span>}
        {label}
      </div>
      <div className="text-slate-900 font-mono text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">
        {value}
      </div>
    </div>
  );
};
