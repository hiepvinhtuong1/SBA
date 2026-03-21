import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../app/provider/AuthProvider';
import { useToast } from '../../../app/provider/ToastProvider';
import { Newspaper, AlertCircle } from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      addToast("Account created successfully. Welcome!", "success");
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center p-6 sm:p-12 bg-surface">
      <div className="w-full max-w-[440px] flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Newspaper className="text-primary w-8 h-8" />
            <h1 className="text-xl font-black text-on-surface tracking-[-0.02em]">FUNewsManagementSystem</h1>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-8 md:p-10 flex flex-col gap-8 shadow-[0_12px_40px_rgba(43,52,55,0.06)] border border-outline-variant/15">
          <div className="space-y-2 text-center">
            <h2 className="text-[1.5rem] font-bold tracking-tight text-on-surface">Create Account</h2>
            <p className="text-[0.875rem] text-on-surface-variant font-medium">Join the editorial team</p>
          </div>

          {error && (
            <div className="bg-error-container/20 border-l-4 border-error p-4 flex items-start gap-3 rounded-lg">
              <AlertCircle className="text-error w-5 h-5 flex-shrink-0" />
              <p className="text-[0.75rem] font-semibold text-error leading-relaxed uppercase tracking-wider">{error}</p>
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.7rem] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-3 text-[0.875rem] focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                placeholder="John Doe" 
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.7rem] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-3 text-[0.875rem] focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                placeholder="john@example.com" 
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.7rem] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-3 text-[0.875rem] focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                placeholder="••••••••" 
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.7rem] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Confirm Password</label>
              <input 
                type="password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-3 text-[0.875rem] focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                placeholder="••••••••" 
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all text-[0.875rem] mt-2 disabled:opacity-50"
            >
              {isLoading ? 'CREATING ACCOUNT...' : 'REGISTER AS EDITOR'}
            </button>
          </form>

          <div className="flex flex-col gap-4 items-center">
            <div className="w-full h-px bg-surface-container"></div>
            <p className="text-[0.75rem] font-medium text-on-surface-variant">
              Already have an account? 
              <Link to="/login" className="text-primary font-bold ml-1 hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
