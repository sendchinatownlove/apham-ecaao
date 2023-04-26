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
        brooklyn_completed_tasks: {"default":0},
        email: user.email,
        manhattan_completed_tasks: {"default":0},
        name: user.displayName,
        queens_completed_tasks: {"default":0},
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
      if (snapshot.val().email === undefined) {
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

  async addRaffleEntry(userId: string, raffleId: string, entries: number): Promise<void> {
    try {
      await set(ref(this.db, `users/${userId}/raffles_entered/${raffleId}`), { entries });
      console.log("Raffle entry added successfully.");
    } catch (error) {
      console.error("Error adding raffle entry:", error);
    }
  }

  // @TODO translate to task 
  async completeTask(userId: string, taskId: string, borough:string): Promise<void> {
    try {
      console.log("the args: ", arguments) 
      await set(ref(this.db, `users/${userId}/${borough}_completed_tasks/${taskId}`), true);
      console.log("User activity added successfully.");
    } catch (error) {
      console.error("Error adding user activity:", error);
    }
  }

  /**
   * Can be used when completing a task
   * 
   * @param userId 
   * @param increment 
   */
  async incrementTicketsRemaining(userId: string, increment: number): Promise<void> {
    try {
      const userRef = ref(this.db, `users/${userId}/tickets_remaining`);
      await runTransaction(userRef, (currentTickets) => {
        return (currentTickets || 0) + increment;
      });
      console.log("tickets_remaining incremented successfully.");
    } catch (error) {
      console.error("Error incrementing tickets_remaining:", error);
    }
  }

  /**
   * Can be used when redeeming a raffle entry
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