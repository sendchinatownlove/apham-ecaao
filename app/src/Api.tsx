import {
  getDatabase,
  ref,
  get,
  set,
  runTransaction,
  DataSnapshot,
  Database,
} from "firebase/database";


import {
  User,
} from 'firebase/auth';
import {getAirTableData, PRIZE_TABLE_NAME, TASK_TABLE_NAME} from "./utils/airtable";
import { RafflePrizeData } from "./components/raffle/RaffleList";
import { UserData } from "./App";

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
   *  3) increases the number of tickets spent toward a given raffle
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
      
      // We're also storing the total number of tickets entered here
      const enteredTicketsRef = ref(this.db, `users/${userId}/tickets_entered`);
      await runTransaction(enteredTicketsRef, (currentNumtickets) => {
        return (currentNumtickets || 0) + ticketCost;
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
   * Get the user's total number of entries into all raffles
   * 
   * @param userId 
   */
    async getEnteredRaffles(userId: string): Promise<number | null> {
      type Raffle = {
        entries: number;
      }

      try {
        const rafflesEntered = (await get(ref(this.db, `users/${userId}/raffles_entered`))).val() ?? {};
        const totalTicketsEntered = Object.values<Raffle>(rafflesEntered).reduce((total, raffle) => total + raffle.entries, 0)
        return totalTicketsEntered;
      } catch (error) {
        console.error(`Error getting entered raffles user ${userId}`, error);
        return null;
      }
    }

  /**
   * Get the number of entries for a specific raffle
   * 
   * @param userId 
   */
    async getEntriesForRaffle(userId: string, raffleId: string): Promise<number | null> {
      type Raffle = {
        entries: number;
      }

      try {
        const entries = (await get(ref(this.db, `users/${userId}/raffles_entered/${raffleId}/entries`))).val();
        return entries;
      } catch (error) {
        console.error(`Error getting entries for raffle ${raffleId} for user ${userId}`, error);
        return null;
      }
    }

  /**
   * Get user's total entered tickets
   * 
   * @param userId 
   */
    async getEnteredRaffleTickets(userId: string): Promise<number | null> {
      type Raffle = {
        entries: number;
      }

      try {
        const ticketsEntered = (await get(ref(this.db, `users/${userId}/tickets_entered`))).val();
        return ticketsEntered;
      } catch (error) {
        console.error(`Error getting total entered raffle tickets for user ${userId}`, error);
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
}

export type Task = {
  id: string;
  title: string;
  description: string;
  borough: string;
  index: number;
  completed?: boolean;
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
          id: p.id,
          title: p.prizeTitle,
          subtitle: p.prizeSubtitle,
          description: p.description,
          image: p.imageUrl,
          ticketsRequired: p.ticketValue,
          dollarValue: p.dollarValue,
          entries: 0
        })
      })
    }
    return result;
  }

  /**
   * 
   * @param tasks 
   * @param userData
   * 
   * @returns the total number of completed tasks 
   */
  addUserStatusToTasks(tasks: Task[], userData: UserData) {
    for (const taskId in {...userData.brooklyn_completed_tasks, ...userData.queens_completed_tasks, ...userData.manhattan_completed_tasks}) {
      let foundTask = tasks.find(t => t.id == taskId);
      if (foundTask){
        foundTask.completed = true;
      }
    }
  }
}
