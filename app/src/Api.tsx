import {
  getDatabase,
  ref,
  get,
  set,
  runTransaction,
  DataSnapshot,
  DatabaseReference,
  Database,
} from "firebase/database";


import {
  User,
} from 'firebase/auth';
import {getAirTableData, PRIZE_TABLE_NAME, TASK_TABLE_NAME} from "./utils/airtable";
import { TaskListData } from "./components/tasks/TaskList";
import { RafflePrizeData } from "./components/raffle/RaffleList";

export class FirebaseService {
  private db: Database;

  constructor() {
    this.db = getDatabase()
  }
  async registerUser(
    user: User,
  ): Promise<void> {
    try {

      // the defaults are set there because couldn't figure out how to set to nothing
      const defaultUserValues = {
        brooklyn_completed_tasks: {},
        email: user.email,
        manhattan_completed_tasks: {},
        name: user.displayName,
        queens_completed_tasks: {},
        raffles_entered: {},
        tickets_remaining: 0,
      };

      await set(ref(this.db, `users/${user.uid}`), defaultUserValues);
      console.log("User registered successfully and default values set.");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  async getUser(user: User): Promise<DataSnapshot | null> {
    try {
      const userId = user.uid
      const snapshot = await get(ref(this.db, `users/${userId}`));
      // user is not initialized yet (firebase on login default sets a UID but no other data)
      if (snapshot.val()?.email === undefined) {
        await this.registerUser(user);
        return null;
      } 
      console.log("my userid: ", snapshot.val(), userId)
      return snapshot;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  }

   /**
   *  Enters the user into a raffle
   *  1) decrements the users number of tickets remaining
   *  2) increases the number of entries for a given raffle
   * 
   * @param userId 
   * @param raffleId
   * @param ticketCost - the number of tickets it costs to enter a raffle
   */
  async enterRaffle(userId: string, raffleId: string, ticketCost: number): Promise<void> {
    try {
      await this.decrementTicketsRemaining(userId, ticketCost);
      const userRef = ref(this.db, `users/${userId}/raffles_entered/${raffleId}/entries`);
      await runTransaction(userRef, (currentNumEntries) => {
        return (currentNumEntries || 0) + 1;
      });
      console.log(`Raffle entry added successfully to raffle ${raffleId}.`);
    } catch (error) {
      console.error(`Error adding entry to raffle ${raffleId}: `, error);
    }
  }

  /**
   *  Decrements a user's tickets for the raffle entry flow
   * 
   * @param userId 
   * @param decrement 
   */
  async decrementTicketsRemaining(userId: string, decrement: number): Promise<void> {
    try {
      const userRef = ref(this.db, `users/${userId}/tickets_remaining`);
      await runTransaction(userRef, (currentTickets) => {
        return (currentTickets || 0) - decrement;
      });
      console.log("tickets_remaining decremented successfully.");
    } catch (error) {
      console.error("Error decrementing tickets_remaining:", error);
    }
  }

  /**
   * Mark task as complete (set json key to true)
   * increment user's tickets 
   * 
   * @param userId 
   * @param taskId 
   * @param borough 
   */
  async completeTask(userId: string, taskId: string, borough:string): Promise<void> {
    try {
      await set(ref(this.db, `users/${userId}/${borough}_completed_tasks/${taskId}`), true);
      console.log("User activity added successfully.");
      
      const userRef = ref(this.db, `users/${userId}/tickets_remaining`);
      console.log(userRef);
      await runTransaction(userRef, (currentTickets) => {
        return (currentTickets || 0) + 1;
      });
      console.log("tickets_remaining incremented successfully.");
    } catch (error) {
      console.error(`Error completing task ${taskId}:`, error);
    }
  }

  async getTasksByBorough(userId: string, borough: string): Promise<any[]> {
    try {
      const tasks = (await get(ref(this.db, `users/${userId}/${borough.toLowerCase()}_completed_tasks`))).val();
      if (tasks === null) return [];
      return tasks;
    } catch (error) {
      console.error(`Error getting ${borough} tasks for user ${userId}`, error);
      return [];
    }
  }

  /**
   * Get user's available raffle tickets
   * 
   * @param userId 
   */
    async getAvailableRaffleTickets(userId: string): Promise<number | null> {
      try {
        const ticketsRemaining = (await get(ref(this.db, `users/${userId}/tickets_remaining`))).val();
        return ticketsRemaining;
      } catch (error) {
        console.error(`Error getting available raffle tickets for user ${userId}`, error);
        return null;
      }
    }

  /**
   * Get user's entered tickets
   * 
   * @param userId 
   */
    async getEnteredRaffleTickets(userId: string): Promise<number | null> {
      type Raffle = {
        entries: number;
      }

      try {
        const rafflesEntered = (await get(ref(this.db, `users/${userId}/raffles_entered`))).val() ?? {};
        const totalTicketsEntered = Object.values<Raffle>(rafflesEntered).reduce((total, raffle) => total + raffle.entries, 0)
        return totalTicketsEntered;
      } catch (error) {
        console.error(`Error getting entered raffle tickets for user ${userId}`, error);
        return null;
      }
    }

  /**
   * Get user's completed tasks across all boroughs as a set of taskID's
   * 
   * @param userId 
   * 
   */
  async getCompletedTasks(userId: string): Promise<Set<string>| null> {
    try {
      let userProfile = (await get(ref(this.db, `users/${userId}`))).val();
     
      // TODO: change when enums for the boroughs are implemented
      let boroughs = ['brooklyn', 'queens', 'manhattan'];

      let completedTasks = new Set<string>();
      if (userProfile != null) { 
        for(let b of boroughs) {
          Object.keys(userProfile[`${b}_completed_tasks`]).forEach(completedTasks.add, completedTasks);
        }
        console.log("Completed tasks retrieved successfully: " + completedTasks);
        return completedTasks;  
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error getting completed tasks`, error);
      return null;
    }
  }

  /**
   * Functions we need to write:
   * 
   * 
   * 1. Get the exact object of user info for the homepage: - Sandy
   *  - number of tasks completed by borough
   *  - number of available tickets (not calculated)
   *  - number of entered tickets
   * 
   * 2. Write the exact function called when completing a task - Jess
   *  - increment tickets remaining
   *  - "complete task" - creating the task ID entry
   * 
   * 3. Get the info needed for a task page - Chianna
   *  - For a user, the list of ID's of completed tasks
   *    - Something like an Object.Keys() on the borough array?
   *  - Think about how to merge this with the AirTable info JSON
   * 
   * 4. Get the exact object of user info for the raffle list: - Sandy
   *  - Can reuse the homepage info?
   * 
   * 5. When entering a raffle - Chianna
   *  - reduce the number of tickets remaining by the # specified
   *  - CreateOrUpdate that raffle entry
   *    - start with entries: 1, or increment the number of entries
   * 
   */
}

export type Task = {
  id: string;
  title: string;
  description: string;
  borough: string;
  index: number;
}

export type Prize = {
  id: string;
  prizeTitle: string;
  prizeSubtitle: string;
  description: string;
  dollarValue: string;
  ticketValue: number;
  productLink: string;
  imageUrl: string;
}

export class AirTableService {
  async getTasks(borough?: string): Promise<Task[]> {
    const processedData: Task[] = []
    try {
      const rawData = await getAirTableData(TASK_TABLE_NAME);

      rawData.forEach((row: any) => {
        const rowFields = row.fields;

        // allows user to filter data by borough if provided to method
        if ((borough != undefined && borough.toLowerCase() === rowFields['Borough'].toLowerCase()) || borough === undefined) {
          const task: Task = {
            id: row['id'],
            title: rowFields['Task Title'],
            description: rowFields['Task Description'],
            borough: rowFields['Borough'],
            index: rowFields['Index']
          }
            processedData.push(task);
          }
      });
    } catch (error) {
      console.error(`Error getting Tasks from Airtable: ${error}`);
    }

    return processedData;
  };

  convertTaskListToTaskListData(tasks: Task[], location: string): TaskListData {
    let result: TaskListData = {
      location: location,
      activities: []
    }
    if (tasks) {
      tasks.forEach(t => {
        result.activities.push({
          activity: {
            title: t.title,
            description: t.description,
            index: t.index,
            id: t.id,
            completed: false,
          }
        })
      });
    }
    return result;
  }

  async getPrizes(): Promise<Prize[]> {
    const processedData: Prize[] = []
    try {
      const rawData = await getAirTableData(PRIZE_TABLE_NAME);

    rawData.forEach((row: any) => {
      const rowFields = row.fields;
      const prize: Prize = {
        id: row['id'],
        prizeTitle: rowFields['Prize Title (Brand)'],
        prizeSubtitle: rowFields['Prize Subtitle (Item)'],
        description: rowFields['Item Description'],
        dollarValue: rowFields['Item Dollar Value'],
        ticketValue: rowFields['Item Ticket Value'],
        productLink: rowFields['Product Link'],
        imageUrl: rowFields['Image URL']
      }
        processedData.push(prize);
      }
    );
    } catch (error) {
      console.error(`Error getting Prizes from Airtable: ${error}`);
    }


    return processedData;
  }

  convertPrizeListToRafflePrizeData(prizes: Prize[]): RafflePrizeData[] {
    const result: RafflePrizeData[] = [];

    if (prizes) {
      prizes.forEach(p => {
        result.push({
          title: p.prizeTitle,
          description: p.description,
          longDescription: [p.description],
          ticketsRequired: p.ticketValue,
          image: p.imageUrl,
          entries: 0,
          id: p.id
        })
      })
    }
    return result;
  }
}
