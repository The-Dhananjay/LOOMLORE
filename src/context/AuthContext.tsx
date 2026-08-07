'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  User,
  UserCredential,
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPopup,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useAuthStore } from '@/lib/auth';

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  googleLogin: () => Promise<User>;
  sendPhoneOTP: (phoneNumber: string, containerId?: string) => Promise<ConfirmationResult>;
  verifyOTP: (confirmationResult: ConfirmationResult, otp: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  clearRecaptcha: () => void;
  formatIndianPhone: (mobile: string) => string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  const { loginWithMobile, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Sync Firebase auth user with Loomlore Zustand store
        const mobile = currentUser.phoneNumber ? currentUser.phoneNumber.replace('+91', '').trim() : '9876543210';
        const email = currentUser.email || `${mobile}@loomlore.in`;
        loginWithMobile(mobile, email);
      }
    });

    return () => unsubscribe();
  }, [loginWithMobile]);

  const clearRecaptcha = () => {
    if (recaptchaVerifier) {
      try {
        recaptchaVerifier.clear();
      } catch (err) {
        // Ignore cleanup errors
      }
      setRecaptchaVerifier(null);
    }
  };

  const formatIndianPhone = (mobile: string): string => {
    const clean = mobile.replace(/\D/g, '');
    if (clean.startsWith('91') && clean.length === 12) {
      return `+${clean}`;
    }
    if (clean.length === 10) {
      return `+91${clean}`;
    }
    return mobile.startsWith('+') ? mobile : `+${clean}`;
  };

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

  const sendPhoneOTP = async (
    phoneNumber: string,
    containerId: string = 'recaptcha-container'
  ): Promise<ConfirmationResult> => {
    const formattedNumber = formatIndianPhone(phoneNumber);

    if (formattedNumber.length < 13) {
      throw new Error('Please enter a valid 10-digit Indian mobile number (+91).');
    }

    try {
      clearRecaptcha();

      let element = document.getElementById(containerId);
      if (!element) {
        element = document.createElement('div');
        element.id = containerId;
        document.body.appendChild(element);
      }

      // Standard Firebase Web Phone Authentication RecaptchaVerifier
      const verifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible'
      });

      setRecaptchaVerifier(verifier);
      const confirmationResult = await signInWithPhoneNumber(auth, formattedNumber, verifier);
      return confirmationResult;
    } catch (error: any) {
      clearRecaptcha();
      if (error.code === 'auth/api-key-not-valid' || error.message?.includes('api-key-not-valid')) {
        throw new Error('APIKEY_INVALID: Firebase API Key is invalid or restricted in Google Cloud Console.');
      }
      if (error.code === 'auth/invalid-phone-number') {
        throw new Error('Invalid mobile number format. Please enter a valid 10-digit number.');
      }
      if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many verification attempts. Please wait a moment and try again.');
      }
      if (error.code === 'auth/quota-exceeded') {
        throw new Error('SMS quota exceeded. Please try again later.');
      }
      throw new Error(error.message || 'Failed to send OTP SMS. Please check your number.');
    }
  };

  const verifyOTP = async (
    confirmationResult: ConfirmationResult,
    otp: string
  ): Promise<UserCredential> => {
    try {
      const cleanOtp = otp.trim();
      if (cleanOtp.length !== 6) {
        throw new Error('OTP must be exactly 6 digits.');
      }
      const credential = await confirmationResult.confirm(cleanOtp);
      return credential;
    } catch (error: any) {
      if (error.code === 'auth/invalid-verification-code') {
        throw new Error('Invalid 6-digit OTP code entered. Please check and re-enter.');
      }
      if (error.code === 'auth/code-expired') {
        throw new Error('OTP verification code has expired. Please click resend to get a new code.');
      }
      throw new Error(error.message || 'OTP verification failed. Please try again.');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      storeLogout();
      clearRecaptcha();
    } catch (error: any) {
      storeLogout();
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      googleLogin,
      sendPhoneOTP,
      verifyOTP,
      logout,
      clearRecaptcha,
      formatIndianPhone
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
