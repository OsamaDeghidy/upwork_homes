import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Auth hook implementation
export function useAuthState(): AuthContextType {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Helper function to get auth headers
  const getAuthHeaders = useCallback((): HeadersInit => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }, []);

  // Helper function to handle API responses
  const handleResponse = useCallback(async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || 'Something went wrong');
    }
    return response.json();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await handleResponse<{ token: string; user: User }>(response);

      // Store token
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', data.token);
      }

      setAuthState({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, [handleResponse]);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Call logout endpoint
      await fetch(`${API_BASE_URL}/auth/logout/`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state and token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }

      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    }
  }, [getAuthHeaders]);

  // Refresh user data
  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(`${API_BASE_URL}/auth/user/`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const user = await handleResponse<User>(response);

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh user';
      
      // If token is invalid, logout
      if (errorMessage.includes('token') || errorMessage.includes('authentication')) {
        await logout();
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
      }
    }
  }, [getAuthHeaders, handleResponse, logout]);

  // Clear error
  const clearError = useCallback((): void => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      
      if (token) {
        await refreshUser();
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, [refreshUser]);

  return {
    ...authState,
    login,
    logout,
    refreshUser,
    clearError,
  };
}

// Helper hooks for specific auth checks
export function useCurrentUser(): User | null {
  const { user } = useAuth();
  return user;
}

export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

export function useUserType(): string | null {
  const { user } = useAuth();
  return user?.user_type || null;
}

export function useIsClient(): boolean {
  const userType = useUserType();
  return userType === 'client';
}

export function useIsProfessional(): boolean {
  const userType = useUserType();
  return ['home_pro', 'specialist', 'crew_member'].includes(userType || '');
}

// Utility function to check if user can access a route
export function useCanAccessRoute(requiredRoles?: string[]): boolean {
  const { isAuthenticated } = useAuth();
  const userType = useUserType();

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  return isAuthenticated && userType ? requiredRoles.includes(userType) : false;
}