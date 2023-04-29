import { User } from 'firebase/auth';
import { FirebaseService } from '../Api';

export const fetchAvailableRaffleTickets = async (firebaseService: FirebaseService, user: User) => {
  const fetchedAvailRaffleTix = await firebaseService.getAvailableRaffleTickets(user.uid);
  return fetchedAvailRaffleTix;

};

export const fetchEnteredRaffleTickets = async (firebaseService: FirebaseService, user: User) => {
  const fetchedEnteredRaffleTix = await firebaseService.getEnteredRaffleTickets(user.uid);
  return fetchedEnteredRaffleTix;
};