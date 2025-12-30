// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { mockUser } from '../utils/mockData';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user
    const savedUser = localStorage.getItem('policy360_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Use mock user for development
      setUser(mockUser);
      localStorage.setItem('policy360_user', JSON.stringify(mockUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - replace with real API
      const user = {
        ...mockUser,
        email,
        lastLogin: new Date().toISOString(),
      };
      
      setUser(user);
      localStorage.setItem('policy360_user', JSON.stringify(user));
      localStorage.setItem('policy360_token', 'mock_jwt_token_' + Date.now());
      
      toast.success('Welcome to POLICY 360°!');
      return { success: true, user };
    } catch (error) {
      toast.error('Login failed. Please check credentials.');
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call to register user
      const response = await fakeApiCall(userData);
      console.log('User registered:', response);
      
      const newUser = {
        id: 'user_' + Date.now(),
        ...response,
        createdAt: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem('policy360_user', JSON.stringify(newUser));
      localStorage.setItem('policy360_token', 'mock_jwt_token_' + Date.now());
      
      toast.success('Account created successfully!');
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('policy360_user');
    localStorage.removeItem('policy360_token');
    toast.success('Logged out successfully');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('policy360_user', JSON.stringify(updatedUser));
    toast.success('Profile updated successfully');
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    console.log('AuthContext: isAuthenticated =', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Simulated API call function
const fakeApiCall = async (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data) {
                resolve({ ...data, id: Date.now() });
            } else {
                reject('Invalid data');
            }
        }, 1000);
    });
};

export { AuthContext };