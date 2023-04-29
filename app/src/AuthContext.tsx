// AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';

import {
  // getAuth,
  // User,
  ActionCodeSettings,
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
} from "firebase/auth";

// Define the type for the authentication context value
type AuthContextValue = {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  sendSignInEmail: (email: string) => Promise<void>;
  signInWithEmail: (email: string, emailLink: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Create the authentication context
const AuthContext = createContext<AuthContextValue | null>(null);

// Define the type for the AuthProvider's props
type AuthProviderProps = {
  children: ReactNode; // Define the 'children' prop with type ReactNode
  appContext: FirebaseApp;
};

// Define the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children, appContext }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(""); // doesn't go anywhere
  const [email, setEmail] = useState(""); // doesn't go anywhere

  let auth = getAuth(appContext);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [auth]);

  // Define authentication methods (signInWithGoogle, sendSignInEmail, signInWithEmail, signOut)
  // You can use the existing implementations from your `App.tsx` file

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const sendSignInEmail = async (email: string) => {


    console.log("sending email call")
    const actionCodeSettings: ActionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
      // webRequest: {
      //     rel: 'noopener'
      // }
    };
      const result = await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      // console.log(result)
      // setEmail("");
      // setError("Email sent. Please check your inbox.");
  };

  const signInWithEmail = async (email: string, emailLink: string) => {
    try {
      await signInWithEmailLink(auth, email, emailLink);
    } catch (error: any) {
      console.log(error)
      setError(error.message);
    }
  };

  const signOut = async () => {
    // Implementation here
  };

  // Provide the user object and authentication methods as the context value
  const value: AuthContextValue = {
    user,
    signInWithGoogle,
    sendSignInEmail,
    signInWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Define a custom hook to access the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
