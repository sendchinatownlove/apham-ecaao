import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {AirTableService, FirebaseService, Prize, Task} from './Api';
import './App.css';
import Home from "./pages/Home";

import {
    getAuth,
    User,
    signInWithPopup,
    GoogleAuthProvider,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    signOut,
} from "firebase/auth";

import Login from "./pages/Login";
import RaffleListView from "./components/raffle/RaffleListView";
import RaffleEntry from "./components/raffle/RaffleEntry";
import TaskList from "./components/tasks/TaskList";

import { initializeApp } from "firebase/app";
import { raffleListData } from "./mock-data/raffle-list-data";
import { Borough } from "./utils/borough";
import { all } from "axios";

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
    appId: "1:955910274384:web:a9de7ecfaa88aa3b940055",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firebaseService = new FirebaseService();
const airtableService = new AirTableService();

type TaskTuple = {
  [Borough.Brooklyn]?: Task[],
  [Borough.Queens]?: Task[],
  [Borough.Manhattan]?: Task[]
}

export type UserData = {
    brooklyn_completed_tasks?: {},
    manhattan_completed_tasks?: {},
    queens_completed_tasks?: {},
    email?: string,
    raffles_entered?: {},
    tickets_remaining?: number
}

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [userData, setUserData] = useState<UserData>({});

    const [prizes, setPrizes] = useState<Prize[]>([]);

    const getAllTasks = async () => {
      const allTasks: TaskTuple = {
        [Borough.Brooklyn]: await airtableService.getTasks(Borough.Brooklyn),
        [Borough.Queens]: await airtableService.getTasks(Borough.Queens),
        [Borough.Manhattan]: await airtableService.getTasks(Borough.Manhattan),
      }
      return allTasks;
    };

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
            window.localStorage.setItem("emailForSignIn", email);
            setEmail("");
            setError("Email sent. Please check your inbox.");
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
        const { user } = props;
        return (
            <div>
                {user ? (
                    <Home user={user} />
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
            </div>
        );
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
            const email = window.localStorage.getItem("emailForSignIn");
            if (email) {
                signInWithEmail(email, window.location.href);
                window.localStorage.removeItem("emailForSignIn");
            }
        }
        if (user) {
            // Fetch user data
            const fetchUserData = async () => {
                const userData = (await firebaseService.getUser(user))?.val() as UserData;
                setUserData(userData);
                console.log("users data: ", userData);

                let allTasks = await getAllTasks();
                for (let [borough,taskSet] of Object.entries(allTasks)) {
                    airtableService.addUserStatusToTasks(taskSet, userData);
                }
                setPrizes(await airtableService.getPrizes());
            };

            fetchUserData();

            // This is just test code, and should not really be executed here

            // Jess - CompleteTask testing
            /**
             * generate a task
             * run the firebaseService class function (completeTask) from Apt.tsx
             */
            // const completeTask = async () => {
            //   function generateTask() {
            //     const randomNumber = Math.floor(Math.random() * 100) + 1;
            //     const randomBorough = ["manhattan", "brooklyn", "queens"][Math.floor(Math.random() * 3)];
            //     return {
            //       randomBorough,
            //       randomNumber
            //     };
            //   }
            //   const task = generateTask();
            //   console.log(task);
            //   await firebaseService.completeTask(user.uid, String(task.randomNumber), task.randomBorough);
            // };
            // completeTask();

            // // Add a raffle ticket entry
            // const addRaffleTicketEntry = async () => {
            //   const raffleId = 'some_raffle_id';
            //   const numberOfEntries = 1;
            //   await firebaseService.addRaffleEntry(user.uid, raffleId, numberOfEntries);
            // };

            // addRaffleTicketEntry();

            // // Increment the tickets_remaining
            // const incrementTickets = async () => {
            //   const incrementValue = 5;
            //   await firebaseService.incrementTicketsRemaining(user.uid, incrementValue);
            // };

            // incrementTickets();

            // // Decrement the tickets_remaining
            // const decrementTickets = async () => {
            //   // spending
            //   const decrementValue = 2;
            //   await firebaseService.decrementTicketsRemaining(user.uid, decrementValue);
            // };

            // decrementTickets();
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
            element: <HomePage user={user} />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/raffles",
            element: <RaffleListView prizeData={airtableService.convertPrizeListToRafflePrizeData(prizes)} />,
        },
        {
            path: "/raffle-entry",
            element: (
                <RaffleEntry
                    title={raffleListData[0].title}
                    description={raffleListData[2].description}
                    longDescription={raffleListData[0].longDescription}
                    image={raffleListData[0].image}
                    ticketsRequired={raffleListData[0].ticketsRequired}
                    entries={raffleListData[2].entries}
                />
            ),
        },
        {
            path: "/tasks/:borough",
            element: (
                <TaskList
                    userId={user?.uid}
                />
            )
        },
    ]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
