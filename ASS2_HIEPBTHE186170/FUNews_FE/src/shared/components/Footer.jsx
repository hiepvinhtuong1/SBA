import { Newspaper } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container border-t border-outline-variant/10 px-8 py-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Newspaper className="text-primary w-5 h-5 opacity-80" />
          <span className="text-[0.75rem] font-black text-on-surface tracking-[-0.01em] uppercase opacity-70">
            FUNews <span className="text-primary-dim">Management System</span>
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <p className="text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-widest">
            &copy; {currentYear} FPT University Editorial Board
          </p>
          <div className="h-4 w-px bg-outline-variant/20 hidden md:block"></div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[0.65rem] font-black text-on-surface-variant hover:text-primary uppercase tracking-[0.1em] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[0.65rem] font-black text-on-surface-variant hover:text-primary uppercase tracking-[0.1em] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
