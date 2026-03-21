import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../../shared/services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = authService.getUser();
    const token = authService.getToken();
    if (storedUser && token) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    authService.setToken(response.token);
    authService.setUser(response.user);
    setUser(response.user);
    return response.user;
  };

  const register = async (name, email, password) => {
    const response = await authService.register(name, email, password);
    authService.setToken(response.token);
    authService.setUser(response.user);
    setUser(response.user);
    return response.user;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
