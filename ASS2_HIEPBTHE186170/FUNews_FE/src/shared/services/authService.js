import axiosClient from './axiosClient';

const authService = {
  login: (email, password) => {
    return axiosClient.post('/auth/login', { email, password });
  },

  register: (accountName, accountEmail, accountPassword) => {
    return axiosClient.post('/auth/register', { accountName, accountEmail, accountPassword });
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  removeUser: () => {
    localStorage.removeItem('user');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authService;
