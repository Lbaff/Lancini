
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  isVerified: boolean;
  skills: string[];
  portfolioCount: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved authentication on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('lancini-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user', error);
        localStorage.removeItem('lancini-user');
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock - in a real app, you'd call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        profilePicture: 'https://i.pravatar.cc/150?u=' + email,
        isVerified: true,
        skills: ['Web Development', 'UI/UX', 'React'],
        portfolioCount: 5
      };
      
      setUser(mockUser);
      localStorage.setItem('lancini-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock - in a real app, you'd call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        profilePicture: 'https://i.pravatar.cc/150?u=' + email,
        isVerified: false,
        skills: [],
        portfolioCount: 0
      };
      
      setUser(mockUser);
      localStorage.setItem('lancini-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('lancini-user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
