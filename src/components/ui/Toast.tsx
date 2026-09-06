import { useEffect, useState } from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Toast() {
  const { toast, showToast } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    info: <Info className="h-5 w-5 text-cyan-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
  };

  const borders = {
    success: 'border-emerald-200',
    info: 'border-cyan-200',
    error: 'border-red-200',
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className={`flex items-center gap-3 rounded-xl border ${borders[toast.type]} bg-white px-5 py-4 shadow-card`}>
        {icons[toast.type]}
        <p className="text-sm font-semibold text-navy-900">{toast.message}</p>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
