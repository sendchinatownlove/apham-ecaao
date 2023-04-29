// AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import {
    // getAuth,
    // User,
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
  };
  import { ActionCodeSettings } from 'firebase/auth';

// Define the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children })  => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  // Initialize Firebase (replace with your own configuration)
  const firebaseConfig = {
    apiKey: "AIzaSyD_KVSLkt8eq7-GEFegX9XGfGNg75tucAc",
    authDomain: "scl-scavengerhunt.firebaseapp.com",
    projectId: "scl-scavengerhunt",
    storageBucket: "scl-scavengerhunt.appspot.com",
    messagingSenderId: "955910274384",
    appId: "1:955910274384:web:a9de7ecfaa88aa3b940055",
};
  const firebaseApp = initializeApp(firebaseConfig);
  let auth = getAuth(firebaseApp);

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
        // handleCodeInApp: false,
        // webRequest: {
        //     rel: 'noopener'
        // }
    };
    try {
        const result = await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem("emailForSignIn", email);
        console.log(result)
        setEmail("");
        setError("Email sent. Please check your inbox.");
    } catch (error: any) {
        console.log(error)
        sendSignInLinkToEmail(auth, email, actionCodeSettings);
        setError(error.message);
    }
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
