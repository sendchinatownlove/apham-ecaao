import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {AirTableService, FirebaseService, Prize, Task} from './Api';
import './App.css';
import Home from "./pages/Home";

import { AuthProvider } from "./AuthContext";

import {
    getAuth,
    User,
} from "firebase/auth";

import Login from "./pages/Login";
import RaffleListView from "./pages/RaffleListView";
import TaskList from "./components/tasks/TaskList";

import { initializeApp } from "firebase/app";
import { Borough } from "./utils/borough";
import GooglyEyeLoader from "./components/shared/GooglyEyeLoader";

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

    const [isReady, setIsReady] = useState<boolean>(false);

    const getAllTasks = async () => {
      const allTasks: TaskTuple = {
        [Borough.Brooklyn]: await airtableService.getTasks(Borough.Brooklyn),
        [Borough.Queens]: await airtableService.getTasks(Borough.Queens),
        [Borough.Manhattan]: await airtableService.getTasks(Borough.Manhattan),
      }
      return allTasks;
    };

    interface UserProps {
        user: User | null;
    }

    function HomePage(props: UserProps) {
        return (
            <>
                {isReady ? (
                    <>
                        {user ? (
                            <Home user={user} />
                        ) : (
                            <>
                                <Login></Login>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <GooglyEyeLoader></GooglyEyeLoader>
                    </>
                )}
            </>
        );
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setIsReady(true);
        });

        if (user) {
            // Fetch user data
            const fetchUserData = async () => {
                const userData = (await firebaseService.getUser(user))?.val() as UserData;
                setUserData(userData);

                /*
                No longer being used -- pages are getting their tasks directly
                let allTasks = await getAllTasks();
                for (let [borough,taskSet] of Object.entries(allTasks)) {
                    airtableService.addUserStatusToTasks(taskSet, userData);
                }
                */

                setPrizes(await airtableService.getPrizes());
            };

            fetchUserData();
        }

        return () => unsubscribe();
    }, [user]);

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
            element: <RaffleListView user={user!} prizeData={airtableService.convertPrizeListToRafflePrizeData(prizes)} />,
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
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </div>
    );
}

export default App;