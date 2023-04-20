import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {FirebaseService} from './Api';
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

import TaskList from './components/tasks/TaskList';
import RaffleListView from './components/raffle/RaffleListView';
import TaskCompletion from './pages/TaskCompletion';
import Login from './pages/Login';

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
const firebaseService = new FirebaseService();

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
    <h1>Send Chinatown Love</h1>
    <h1>APHAM Scavenger Hunt!</h1>
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
    if (user) {
      console.log("Entered here")
      // Fetch user data
      const fetchUserData = async () => {
        const userData = await firebaseService.getUser(user);
        console.log("users data: ", userData?.val());
      };
  
      fetchUserData();
  
      // Add an activity entry
      const completeTask = async () => {
        function generateTask() {
          const randomNumber = Math.floor(Math.random() * 100) + 1;
          const randomBorough = ["manhattan", "brooklyn", "queens"][Math.floor(Math.random() * 3)];
          return {
            randomBorough,
            randomNumber
          };
        }
        const task = generateTask();
        console.log(task)
        await firebaseService.completeTask(user.uid, task, true);
      };
  
      completeTask();
      // Add a raffle ticket entry
      const addRaffleTicketEntry = async () => {
        const raffleId = 'some_raffle_id';
        const numberOfEntries = 1;
        await firebaseService.addRaffleEntry(user.uid, raffleId, numberOfEntries);
      };
  
      addRaffleTicketEntry();
  
      // Increment the tickets_remaining
      const incrementTickets = async () => {
        const incrementValue = 5;
        await firebaseService.incrementTicketsRemaining(user.uid, incrementValue);
      };
  
      incrementTickets();
  
      // Decrement the tickets_remaining
      const decrementTickets = async () => {
        // spending
        const decrementValue = 2;
        await firebaseService.decrementTicketsRemaining(user.uid, decrementValue);
      };
  
      decrementTickets();
  
    }

    return () => unsubscribe();
  }, [user]);

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
    },
    {
      path: "/raffles",
      element: (
        <RaffleListView prizeData={raffleListData} />
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
