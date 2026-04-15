import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { login as apiLogin, register as apiRegister } from '../service/api';

const AuthContext = createContext(null);

// ============================================================
// DEV MODE: Set to true to mock backend API calls for Auth.
// ============================================================
const DEV_MODE = true;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    if (DEV_MODE) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let newUser = null;
          if (email === 'employee@company.com' && password === 'password') {
            newUser = { name: 'Jane Employee', email: 'employee@company.com', role: 'employee' };
          } else if (email === 'admin@company.com' && password === 'password') {
            newUser = { name: 'HR Admin', email: 'admin@company.com', role: 'admin' };
          } else {
            resolve({ success: false, error: 'Invalid credentials for testing. Please check the provided dev accounts.' });
            return;
          }
          
          const newToken = 'dev-token-' + newUser.role;
          setToken(newToken);
          setUser(newUser);
          localStorage.setItem('authToken', newToken);
          localStorage.setItem('authUser', JSON.stringify(newUser));
          resolve({ success: true });
        }, 1000); // simulate network delay
      });
    }

    try {
      const response = await apiLogin(email, password);
      const { token: newToken, user: newUser } = response.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('authUser', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  }, []);

  const register = useCallback(async (payload) => {
    try {
      if (DEV_MODE) {
        return new Promise((resolve) => {
          setTimeout(() => {
             const newUser = { name: payload.name, email: payload.email, role: 'employee' };
             const newToken = 'dev-token-new';
             setToken(newToken);
             setUser(newUser);
             localStorage.setItem('authToken', newToken);
             localStorage.setItem('authUser', JSON.stringify(newUser));
             resolve({ success: true });
          }, 1000);
        });
      }
      
      const response = await apiRegister(payload);
      const { token: newToken, user: newUser } = response.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('authUser', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }, []);

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    loading,
    devMode: DEV_MODE,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
