import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from "./home";
import Layout from "./layout";

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

import Login from './pages/Login';
import RaffleListView from './components/raffle/RaffleListView';
import RaffleEntry from './components/raffle/RaffleEntry';
import TaskList from './components/tasks/TaskList';
import TaskCompletion from './pages/TaskCompletion';


import { initializeApp } from 'firebase/app';
import { taskListData } from "./mock-data/task-list-data";
import { raffleListData } from './mock-data/raffle-list-data';
import dummyTask from './mock-data/dummyTask.json';

// const FIREBASE_CONFIG = {
//   apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
//   appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
//   authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
//   messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
// };


// According to this, this is ok to be public 
// https://stackoverflow.com/a/37484053/2138186
const firebaseConfig = {
  apiKey: "AIzaSyD_KVSLkt8eq7-GEFegX9XGfGNg75tucAc",
  authDomain: "scl-scavengerhunt.firebaseapp.com",
  projectId: "scl-scavengerhunt",
  storageBucket: "scl-scavengerhunt.appspot.com",
  messagingSenderId: "955910274384",
  appId: "1:955910274384:web:a9de7ecfaa88aa3b940055"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
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
    } catch (error: any) {
      setError(error.message);
    }
  };

  const signInWithEmail = async (email: string, emailLink: string) => {
    try {
      await signInWithEmailLink(auth, email, emailLink);
    } catch (error: any) {
      setError(error.message);
    }
  };

  interface UserProps {
    user: User | null;
  }

  function HomePage(props: UserProps) {
    const { user } = props
  return <div>
    {user ? (
        <Home user={user}/>
      ) : (
        <>
          <h3>Sign in to get started!</h3>
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
    </div>;
  }

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><HomePage user={user}/></Layout>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/raffles",
      element: (
        <RaffleListView prizeData={raffleListData} />
      )
    },
    {
      path: "/raffle-entry",
      element: (
      <RaffleEntry 
        title = {raffleListData[0].title}
        description = {raffleListData[2].description}
        longDescription={raffleListData[0].longDescription}
        image = {raffleListData[0].image}
        ticketsRequired = {raffleListData[0].ticketsRequired}
        entries={raffleListData[2].entries} />
      )

    },
    {
      path: "/tasks/manhattan",
      element: (
      <TaskList
        location={taskListData[0].location}
        availableTickets={22}
        activities={taskListData[0].activities}
      />
      )
    },
    {
      path: "/tasks/brooklyn",
      element: (
      <TaskList
        location={taskListData[1].location}
        availableTickets={22}
        activities={taskListData[1].activities}
      />
      )
    },
    {
      path: "/tasks/queens",
      element: (
      <TaskList
        location={taskListData[2].location}
        availableTickets={22}
        activities={taskListData[2].activities}
      />
      )
    },
    {
      path: "/task-completion",
      element: (
        <TaskCompletion location={dummyTask.location}
        taskHeader={dummyTask.header}
        taskDescription={dummyTask.description}/>
      )
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
);
}

export default App;
