import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from '../../shared/components/Sidebar';
import { TopBar } from '../../shared/components/TopBar';
import { Footer } from '../../shared/components/Footer';
import { useAuth } from '../provider/AuthProvider';

export const MainLayout = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col md:flex-row overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative overflow-y-auto">
        <TopBar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 md:p-10 bg-surface">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
