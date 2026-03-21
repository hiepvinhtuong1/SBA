import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const ModalComponent = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 glass-overlay transition-all animate-in fade-in duration-200">
      <div 
        className="fixed inset-0 bg-on-surface/5" 
        onClick={onClose}
      />
      <div 
        className={`bg-surface-container-lowest w-full ${sizeClasses[size] || sizeClasses.md} rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-outline-variant/10 relative z-10 animate-in zoom-in-95 duration-200`}
      >
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <div>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-primary mb-1 block">Administrative Action</span>
            <h3 className="text-2xl font-black text-on-surface tracking-tight leading-tight">{title}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-xl hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="px-8 py-4 overflow-y-auto max-h-[70vh] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
