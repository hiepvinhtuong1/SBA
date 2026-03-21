import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

export const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Outlet />
    </div>
  );
};
