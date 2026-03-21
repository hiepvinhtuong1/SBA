import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../app/provider/AuthProvider';
import { useToast } from '../../../app/provider/ToastProvider';
import { Newspaper, AlertCircle } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      addToast("Welcome back!", "success");
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please verify your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center p-6 sm:p-12 bg-surface">
      <div className="w-full max-w-[400px] flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Newspaper className="text-primary w-8 h-8" />
            <h1 className="text-xl font-black text-on-surface tracking-[-0.02em]">FUNewsManagementSystem</h1>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-8 md:p-10 flex flex-col gap-8 shadow-[0_12px_40px_rgba(43,52,55,0.06)] border border-outline-variant/15">
          <div className="space-y-2 text-center">
            <h2 className="text-[1.5rem] font-bold tracking-tight text-on-surface">Welcome back</h2>
            <p className="text-[0.875rem] text-on-surface-variant font-medium">Access your editorial dashboard</p>
          </div>

          {error && (
            <div className="bg-error-container/20 border-l-4 border-error p-4 flex items-start gap-3 rounded-lg">
              <AlertCircle className="text-error w-5 h-5 flex-shrink-0" />
              <p className="text-[0.75rem] font-semibold text-error leading-relaxed uppercase tracking-wider">{error}</p>
            </div>
          )}

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-on-surface-variant ml-1">Email Address</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-3.5 text-[0.875rem] focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline" 
                placeholder="editor@funews.com" 
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-on-surface-variant ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-3.5 text-[0.875rem] focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline" 
                placeholder="••••••••" 
                required
              />
            </div>

            {isLoading && (
              <div className="w-full h-[2px] bg-primary-fixed-dim overflow-hidden rounded-full">
                <div className="h-full bg-primary w-1/3 animate-[pulse_2s_infinite]"></div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary font-bold py-4 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all duration-200 text-[0.875rem] tracking-wide disabled:opacity-50"
            >
              LOG IN TO DASHBOARD
            </button>
          </form>

          <div className="flex flex-col gap-4 items-center">
            <a href="#" className="text-[0.875rem] font-medium text-primary hover:underline transition-all">Forgot password?</a>
            <div className="w-full h-px bg-surface-container"></div>
            <p className="text-[0.75rem] font-medium text-on-surface-variant">
              Don't have an account? 
              <Link to="/register" className="text-primary font-bold ml-1 hover:text-primary-dim">Register</Link>
            </p>
          </div>
        </div>

        <div className="text-center text-[0.75rem] font-medium uppercase tracking-[0.05em] text-outline">
          Editorial Control v4.2.0
        </div>
      </div>
    </main>
  );
};
