import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 3s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 min-w-[300px] max-w-sm rounded-xl shadow-lg shadow-black/5 transform transition-all duration-300 animate-in slide-in-from-right-8 fade-in 
              ${toast.type === 'success' ? 'bg-primary-container text-on-primary-container border border-primary/20' : 
                toast.type === 'error' ? 'bg-error-container text-on-error-container border border-error/20' : 
                'bg-surface-container-high text-on-surface border border-outline/20'}`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-on-surface-variant flex-shrink-0" />}
            
            <p className="flex-1 text-sm font-semibold">{toast.message}</p>
            
            <button 
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-black/5 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 opacity-70" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
