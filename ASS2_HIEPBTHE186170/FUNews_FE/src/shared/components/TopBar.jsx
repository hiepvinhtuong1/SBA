import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../app/provider/AuthProvider';

export const TopBar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full sticky top-0 z-40 bg-surface flex items-center justify-between px-8 py-4 max-w-full border-b border-surface-container-high">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2 text-on-surface-variant">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="font-headline tracking-tight text-xl font-bold text-on-background">
          FUNewsManagementSystem
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
            <Search className="w-5 h-5 text-on-surface-variant" />
          </button>
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
            <Bell className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{user?.role || 'Admin'}</p>
            <p className="text-sm font-semibold text-on-surface">{user?.name || 'Editor-in-Chief'}</p>
          </div>
          <div 
            className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border-2 border-white shadow-sm cursor-pointer"
            onClick={logout}
            title="Click to logout"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD67j571q-Bo96AWw4QbXCq955LN6H7o5Rtgxx0tVQ5q1syQzgS7dp3XpOELoVjVYnhzpdn6tBLKMeWj_1-5CwDIXyBjvroBaUpphWItpOy8AEgK9LH8d8SrVQIVpQ2A3CuH-iZvKHHgydZlVcX-AocBUO7aocpOGuvGkBNBImfOMTGYZjfUht8U4_sDN7_kIvEY-bnRif93Oq_0SHUmKX1qeNyFHW43f8C8Af67Y7Vz_BWhkHBdAS8Rjp25usoL-hHbj1HP2S3gjQ" 
              alt="User Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};
