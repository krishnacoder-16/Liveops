'use client';

import { toast } from 'sonner';

interface SelectFieldProps {
  label: string;
  description?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  toastMessage?: string;
}

export const SelectField = ({ label, description, value, options, onChange, toastMessage }: SelectFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    if (toastMessage) {
      toast.success(toastMessage, { duration: 2000 });
    }
  };

  return (
    <div className="px-6 py-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
      </div>
      
      <div className="relative w-48">
        <select
          value={value}
          onChange={handleChange}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white cursor-pointer shadow-sm"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
