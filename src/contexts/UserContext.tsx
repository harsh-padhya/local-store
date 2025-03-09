/**
 * @file: UserContext.tsx
 * @description: Context provider for managing user authentication and user data
 * 
 * @dependencies:
 * - react: For context API
 * 
 * @inputs: Children components
 * @outputs: User context provider with user state and functions
 * 
 * @side_effects: Stores user data in localStorage
 */

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Address } from '@/lib/models/order';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  defaultAddressIndex: number;
  photoURL?: string;
  provider?: 'google' | 'email';
}

// User context type
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (index: number, address: Address) => void;
  removeAddress: (index: number) => void;
  setDefaultAddress: (index: number) => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  loginWithGoogle: async () => false,
  logout: () => {},
  register: async () => false,
  updateUser: () => {},
  addAddress: () => {},
  updateAddress: () => {},
  removeAddress: () => {},
  setDefaultAddress: () => {},
});

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

// Generate a unique user ID
function generateUserId(): string {
  return `user_${Math.random().toString(36).substring(2, 9)}`;
}

// Mock Google Auth
const mockGoogleAuth = (): Promise<{
  name: string;
  email: string;
  photoURL: string;
}> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve({
        name: 'Google User',
        email: 'google.user@example.com',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      });
    }, 1000);
  });
};

// User provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  // Login with Google
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      // Simulate Google Auth
      const googleUser = await mockGoogleAuth();
      
      // Create user object
      const newUser: User = {
        id: generateUserId(),
        name: googleUser.name,
        email: googleUser.email,
        photoURL: googleUser.photoURL,
        addresses: [],
        defaultAddressIndex: -1,
        provider: 'google',
      };
      
      // Save to "database" (localStorage)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUserIndex = users.findIndex((u: any) => u.email === googleUser.email);
      
      if (existingUserIndex >= 0) {
        // Update existing user
        users[existingUserIndex] = {
          ...users[existingUserIndex],
          photoURL: googleUser.photoURL,
          provider: 'google',
        };
        localStorage.setItem('users', JSON.stringify(users));
        setUser(users[existingUserIndex]);
      } else {
        // Add new user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        setUser(newUser);
      }
      
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    }
  };
  
  // Login function (simplified for demo)
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll just check if the user exists in localStorage
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo, we'll create a mock user if email contains "test" or "demo"
      if (email.includes('test') || email.includes('demo')) {
        const mockUser: User = {
          id: generateUserId(),
          name: 'Test User',
          email,
          phone: '+91 9876543210',
          addresses: [],
          defaultAddressIndex: -1,
          provider: 'email',
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        return true;
      }
      
      // Check if user exists in localStorage (for previously registered users)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Register function (simplified for demo)
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((u: any) => u.email === email)) {
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: generateUserId(),
        name,
        email,
        addresses: [],
        defaultAddressIndex: -1,
        provider: 'email',
      };
      
      // Save to "database" (localStorage)
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Log in the new user
      setUser(newUser);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };
  
  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    
    // Update in "database" (localStorage)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };
  
  // Add a new address
  const addAddress = (address: Address) => {
    if (!user) return;
    
    const updatedAddresses = [...user.addresses, address];
    const defaultAddressIndex = user.defaultAddressIndex === -1 ? 0 : user.defaultAddressIndex;
    
    updateUser({
      addresses: updatedAddresses,
      defaultAddressIndex,
    });
  };
  
  // Update an existing address
  const updateAddress = (index: number, address: Address) => {
    if (!user || index < 0 || index >= user.addresses.length) return;
    
    const updatedAddresses = [...user.addresses];
    updatedAddresses[index] = address;
    
    updateUser({ addresses: updatedAddresses });
  };
  
  // Remove an address
  const removeAddress = (index: number) => {
    if (!user || index < 0 || index >= user.addresses.length) return;
    
    const updatedAddresses = user.addresses.filter((_, i) => i !== index);
    let defaultAddressIndex = user.defaultAddressIndex;
    
    // Adjust default address index if needed
    if (index === defaultAddressIndex) {
      defaultAddressIndex = updatedAddresses.length > 0 ? 0 : -1;
    } else if (index < defaultAddressIndex) {
      defaultAddressIndex--;
    }
    
    updateUser({
      addresses: updatedAddresses,
      defaultAddressIndex,
    });
  };
  
  // Set default address
  const setDefaultAddress = (index: number) => {
    if (!user || index < 0 || index >= user.addresses.length) return;
    
    updateUser({ defaultAddressIndex: index });
  };
  
  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginWithGoogle,
        logout,
        register,
        updateUser,
        addAddress,
        updateAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
} 