import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../app/provider/AuthProvider';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Mock login for now
      if (email === 'admin@funews.com' && password === 'admin123') {
        login({ email, fullName: 'Admin User', role: 'Admin' });
        navigate('/admin/dashboard');
      } else if (email === 'staff@funews.com' && password === 'staff123') {
        login({ email, fullName: 'Staff Member', role: 'Staff' });
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password. Use admin@funews.com / admin123');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <div className="text-center mb-4">
        <h2 className="editorial-display" style={{ fontSize: '1.75rem' }}>Welcome back</h2>
        <p className="text-muted">Enter your credentials to access your account</p>
      </div>

      {error && (
        <div className="alert alert-danger py-2" style={{ fontSize: '0.875rem', borderRadius: '8px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label font-weight-medium" style={{ fontSize: '0.875rem' }}>Email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ borderRadius: '8px', padding: '0.6rem 1rem' }}
          />
        </div>

        <div className="mb-4">
          <label className="form-label font-weight-medium" style={{ fontSize: '0.875rem' }}>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ borderRadius: '8px', padding: '0.6rem 1rem' }}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-azure-primary w-100 mb-3"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Sign in'}
        </button>

        <p className="text-center mb-0" style={{ fontSize: '0.875rem' }}>
          Don't have an account? <Link to="/register" className="text-primary text-decoration-none font-weight-bold">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
