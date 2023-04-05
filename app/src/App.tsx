import React, { useEffect, useState } from 'react';
import './App.css';

import {
  getAuth,
  User,
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
} from 'firebase/auth';

import { initializeApp } from 'firebase/app';

const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
};

const firebaseApp = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error : any) {
      setError(error.message);
    }
  };

  const sendSignInEmail = async (email: string) => {
    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setEmail('');
      setError('Email sent. Please check your inbox.');
    } catch (error : any) {
      setError(error.message);
    }
  };

  const signInWithEmail = async (email: string, emailLink: string) => {
    try {
      await signInWithEmailLink(auth, email, emailLink);
    } catch (error : any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // @TODO https://firebase.google.com/docs/auth/web/email-link-auth?authuser=2&hl=en 
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn');
      if (email) {
        signInWithEmail(email, window.location.href);
        window.localStorage.removeItem('emailForSignIn');
      }
    }

    return () => unsubscribe();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendSignInEmail(email);
  };

  return (
    <div className="App">
      <h1>Send Chinatown Love</h1>
      <h1>APHAM Scavenger Hunt!</h1>
      <h3>Sign in to get started!</h3>
      {user ? (
        <div>
          <h3>Welcome, {user.email}</h3>
          <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
      ) : (
        <>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send sign-in email</button>
        </form>
        {error && <p>{error}</p>}
      </>
    )}
  </div>
);
}

export default App;
