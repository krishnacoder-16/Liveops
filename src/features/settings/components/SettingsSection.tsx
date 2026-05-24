import { ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const SettingsSection = ({ title, description, children }: SettingsSectionProps) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
      <div className="divide-y divide-slate-100">
        {children}
      </div>
    </section>
  );
};
