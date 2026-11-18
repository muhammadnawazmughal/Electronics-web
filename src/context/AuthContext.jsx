import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Check if user is logged in on initial mount
  const checkUserLoggedIn = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await API.get('/auth/me');
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // 1. LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      setActionLoading(true);
      const { data } = await API.post('/auth/login', { email, password });
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Invalid email or password';
      toast.error(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  // 2. REGISTER FUNCTION
  const register = async (name, email, password, phone) => {
    try {
      setActionLoading(true);
      const { data } = await API.post('/auth/register', { name, email, password, phone });

      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        toast.success('Account created successfully!');
        return { success: true };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  // 3. UPDATE PROFILE FUNCTION
  const updateProfile = async (updatedData) => {
    try {
      setActionLoading(true);
      const { data } = await API.put('/auth/profile', updatedData);

      if (data.success) {
        setUser(data.user);
        toast.success('Profile updated successfully!');
        return { success: true };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  // 4. CHANGE PASSWORD FUNCTION
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setActionLoading(true);
      const { data } = await API.put('/auth/change-password', { currentPassword, newPassword });

      if (data.success) {
        toast.success('Password changed successfully!');
        return { success: true };
      }
    } catch (error) {
      console.error('Password change error:', error);
      const message = error.response?.data?.message || 'Failed to change password';
      toast.error(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  // 5. LOGOUT FUNCTION
  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      toast.success('Logged out successfully');
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        actionLoading,
        login,
        register,
        updateProfile,
        changePassword,
        logout,
        checkUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};