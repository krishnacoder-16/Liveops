'use client';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ToggleFieldProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  toastMessage?: string;
}

export const ToggleField = ({ label, description, checked, onChange, toastMessage }: ToggleFieldProps) => {
  const handleToggle = () => {
    onChange(!checked);
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
      
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : 'bg-slate-200'
        }`}
      >
        <span className="sr-only">Toggle {label}</span>
        <motion.span
          layout
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
