'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useAuthStore } from '@/lib/auth';

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  googleLogin: () => Promise<User>;
  emailRegister: (email: string, password: string, displayName: string) => Promise<User>;
  emailLogin: (email: string, password: string) => Promise<User>;
  sendPasswordReset: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { loginWithMobile, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Sync Firebase auth user with Loomlore Zustand store
        const email = currentUser.email || 'customer@loomlore.in';
        const name = currentUser.displayName || 'Valued Customer';
        loginWithMobile('9876543210', email);
        useAuthStore.getState().updateProfile({ name, email });
      }
    });

    return () => unsubscribe();
  }, [loginWithMobile]);

  const googleLogin = async (): Promise<User> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email || 'customer@loomlore.in';
      const name = result.user.displayName || 'Google User';
      loginWithMobile('9876543210', email);
      useAuthStore.getState().updateProfile({ name, email });
      return result.user;
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Login popup was closed before completing sign in.');
      }
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Login popup was blocked by browser. Please allow popups for loomlore.in.');
      }
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network connection error. Please check your internet connection.');
      }
      if (error.code === 'auth/api-key-not-valid' || error.message?.includes('api-key-not-valid')) {
        throw new Error('APIKEY_INVALID: Firebase API Key is invalid or restricted in Google Cloud Console.');
      }
      throw new Error(error.message || 'Google sign in failed. Please try again.');
    }
  };

  const emailRegister = async (email: string, password: string, displayName: string): Promise<User> => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (displayName && credential.user) {
        await updateProfile(credential.user, { displayName });
      }
      // Send Email Verification
      await sendEmailVerification(credential.user);
      return credential.user;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('An account already exists with this email address. Please sign in instead.');
      }
      if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use at least 6 characters.');
      }
      throw new Error(error.message || 'Registration failed. Please try again.');
    }
  };

  const emailLogin = async (email: string, password: string): Promise<User> => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      
      // Email Verification Check
      if (!credential.user.emailVerified) {
        // Resend verification email if unverified
        try {
          await sendEmailVerification(credential.user);
        } catch (e) {
          // Ignore resend rate limits
        }
        throw new Error('EMAIL_UNVERIFIED: Please verify your email address before signing in. A new verification link has been sent to your inbox.');
      }

      const userEmail = credential.user.email || email;
      const userName = credential.user.displayName || 'Valued Customer';
      loginWithMobile('9876543210', userEmail);
      useAuthStore.getState().updateProfile({ name: userName, email: userEmail });
      return credential.user;
    } catch (error: any) {
      if (error.message?.includes('EMAIL_UNVERIFIED')) {
        throw error;
      }
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      }
      if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please reset your password or try again later.');
      }
      throw new Error(error.message || 'Email sign-in failed. Please try again.');
    }
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address associated with your account.');
      }
      throw new Error(error.message || 'Failed to send password reset email. Please try again.');
    }
  };

  const resendVerificationEmail = async (): Promise<void> => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      storeLogout();
    } catch (error: any) {
      storeLogout();
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      googleLogin,
      emailRegister,
      emailLogin,
      sendPasswordReset,
      resendVerificationEmail,
      logout
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
