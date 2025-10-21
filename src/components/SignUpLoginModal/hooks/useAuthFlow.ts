/**
 * Custom hook for managing authentication flow and API calls
 * Handles login, signup, password reset, and passwordless authentication
 */

import { useState, useCallback } from 'react';
import {
  LoginFormData,
  SignupFormData,
  PasswordResetFormData,
  AuthResponse,
  AuthError,
  User,
} from '../types';

export const useAuthFlow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle user login
   * Replace with your actual authentication API endpoint
   */
  const login = useCallback(async (
    data: LoginFormData
  ): Promise<User | null> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const result: AuthResponse = await response.json();

      // Store authentication token
      if (result.token) {
        localStorage.setItem('authToken', result.token);
      }

      return result.user;
    } catch (err: any) {
      const errorMessage = err.message || "We couldn't find that email as a registered user.";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle user signup
   * Replace with your actual registration API endpoint
   */
  const signup = useCallback(async (
    data: SignupFormData
  ): Promise<User | null> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const result: AuthResponse = await response.json();

      // Store authentication token
      if (result.token) {
        localStorage.setItem('authToken', result.token);
      }

      return result.user;
    } catch (err: any) {
      const errorMessage = err.message || 'Unable to create account. Please try again.';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle password reset request
   * Replace with your actual password reset API endpoint
   */
  const resetPassword = useCallback(async (
    data: PasswordResetFormData
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset failed');
      }

      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Unable to send reset email. Please try again.';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle passwordless login (magic link)
   * Replace with your actual passwordless auth API endpoint
   */
  const passwordlessLogin = useCallback(async (
    email: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/auth/passwordless', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Passwordless login failed');
      }

      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Unable to send login link. Please try again.';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle social authentication (Google, Facebook, etc.)
   * Replace with your actual social auth API endpoint
   */
  const socialAuth = useCallback(async (
    provider: 'google' | 'facebook' | 'apple'
  ): Promise<User | null> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement social auth redirect or popup flow
      window.location.href = `/api/auth/${provider}`;
      return null;
    } catch (err: any) {
      const errorMessage = err.message || `${provider} authentication failed`;
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear any authentication errors
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    // Additional cleanup if needed
  }, []);

  return {
    loading,
    error,
    login,
    signup,
    resetPassword,
    passwordlessLogin,
    socialAuth,
    clearError,
    logout,
  };
};
