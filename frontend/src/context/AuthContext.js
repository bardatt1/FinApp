import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api/authService';

const AuthContext = createContext();

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

  // Check for existing token on mount and fetch user data
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('token');
      
      if (savedToken) {
        setToken(savedToken);
        try {
          // Fetch user data from API
          const userData = await authService.getMe();
          // Transform roles set/array to single role for compatibility
          const roles = userData.roles || [];
          const rolesArray = Array.isArray(roles) ? roles : Array.from(roles || []);
          const role = rolesArray.includes('ROLE_ADMIN') ? 'ADMIN' : 'USER';
          const transformedUser = {
            id: userData.id,
            email: userData.email,
            firstName: userData.fullName?.split(' ')[0] || userData.fullName,
            lastName: userData.fullName?.split(' ').slice(1).join(' ') || '',
            fullName: userData.fullName,
            role: role,
            roles: rolesArray
          };
          setUser(transformedUser);
          localStorage.setItem('user', JSON.stringify(transformedUser));
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // Clear invalid/expired token
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      
      if (response && response.token) {
        const token = response.token;
        setToken(token);
        localStorage.setItem('token', token);
        
        // Fetch user data
        try {
          const userData = await authService.getMe();
          const roles = userData.roles || [];
          const rolesArray = Array.isArray(roles) ? roles : Array.from(roles || []);
          const role = rolesArray.includes('ROLE_ADMIN') ? 'ADMIN' : 'USER';
          const transformedUser = {
            id: userData.id,
            email: userData.email,
            firstName: userData.fullName?.split(' ')[0] || userData.fullName,
            lastName: userData.fullName?.split(' ').slice(1).join(' ') || '',
            fullName: userData.fullName,
            role: role,
            roles: rolesArray
          };
          setUser(transformedUser);
          localStorage.setItem('user', JSON.stringify(transformedUser));
          
          return { success: true, message: 'Login successful' };
        } catch (error) {
          console.error('Failed to fetch user data after login:', error);
          // Even if fetching user data fails, login was successful
          // Clear token to force re-login
          localStorage.removeItem('token');
          setToken(null);
          return { success: false, message: 'Login successful but failed to fetch user data. Please try again.' };
        }
      } else {
        return { success: false, message: 'Invalid response from server' };
      }
    } catch (error) {
      // Extract meaningful error message
      let errorMessage = 'Login failed';
      if (error.message) {
        if (error.message.includes('Unauthorized') || error.message.includes('Bad credentials')) {
          errorMessage = 'Invalid email or password';
        } else if (error.message.includes('Email')) {
          errorMessage = error.message;
        } else {
          errorMessage = error.message;
        }
      }
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      if (response && response.token) {
        const token = response.token;
        setToken(token);
        localStorage.setItem('token', token);
        
        // Fetch user data
        try {
          const userDataFromApi = await authService.getMe();
          const roles = userDataFromApi.roles || [];
          const rolesArray = Array.isArray(roles) ? roles : Array.from(roles || []);
          const role = rolesArray.includes('ROLE_ADMIN') ? 'ADMIN' : 'USER';
          const transformedUser = {
            id: userDataFromApi.id,
            email: userDataFromApi.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userDataFromApi.fullName,
            role: role,
            roles: rolesArray
          };
          setUser(transformedUser);
          localStorage.setItem('user', JSON.stringify(transformedUser));
          
          return { success: true, message: 'Registration successful' };
        } catch (error) {
          console.error('Failed to fetch user data after registration:', error);
          // Even if fetching user data fails, registration was successful
          // Clear token to force re-login
          localStorage.removeItem('token');
          setToken(null);
          return { success: false, message: 'Registration successful but failed to fetch user data. Please log in.' };
        }
      } else {
        return { success: false, message: 'Invalid response from server' };
      }
    } catch (error) {
      // Extract meaningful error message
      let errorMessage = 'Registration failed';
      if (error.message) {
        if (error.message.includes('Email already in use') || error.message.includes('already exists')) {
          errorMessage = 'Email is already registered. Please use a different email or log in.';
        } else if (error.message.includes('Email')) {
          errorMessage = error.message;
        } else if (error.message.includes('fullName') || error.message.includes('Full name')) {
          errorMessage = 'Please provide a valid full name (2-100 characters)';
        } else if (error.message.includes('Password')) {
          errorMessage = 'Password must be at least 6 characters long';
        } else {
          errorMessage = error.message;
        }
      }
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const isAdmin = () => {
    if (!user) return false;
    if (user.role === 'ADMIN') return true;
    if (user.roles) {
      const rolesArray = Array.isArray(user.roles) ? user.roles : Array.from(user.roles || []);
      return rolesArray.includes('ROLE_ADMIN');
    }
    return false;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

