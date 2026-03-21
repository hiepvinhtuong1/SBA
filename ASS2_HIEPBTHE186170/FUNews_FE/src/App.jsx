import { AppRouter } from './app/routers/AppRouter';
import { AuthProvider } from './app/provider/AuthProvider';
import { ToastProvider } from './app/provider/ToastProvider';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ToastProvider>
  );
}
