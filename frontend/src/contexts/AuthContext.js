import React, { createContext, useEffect, useState } from 'react';
import API from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoadingAuth(false);
      return;
    }
    try {
      const res = await API.get('/profile');
      setUser(res.data.user);
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
