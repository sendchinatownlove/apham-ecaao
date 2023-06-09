
import { useEffect, useState } from 'react';
import { User, browserPopupRedirectResolver } from 'firebase/auth';

import { FirebaseService } from '../Api';
import BoroughButton from '../components/home/borough';
import TicketsCounter from '../components/home/ticketsCounter';
import { BodyTextMedium, PageContainer } from "../components/theme";
import styled from "styled-components";
import HomeButton from "../components/header-buttons/homeButton";
import Footer from "../components/shared/footer";
import { FeatureFlags, isFeatureFlagOn } from '../utils/featureFlags';

const HomeContainer = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
`;

const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  margin: 0 auto;
`;

const NumberLine = styled(BodyTextMedium)`
  display: flex;
  gap: 5px;
`;

const Boroughs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MapLink= styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 39px;
  padding: 10px 19px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border-style: solid;
  border-width: 2px;
  border-color: white;

  &:hover {
    color: white;
  }
`;

const MapIcon= styled.span`
  content: url('/location-pin.svg');
  width: 33px;
`;

interface Props {
  user: User,
}

function Home(props: Props) {
  const { user } = props;
  const firebaseService = new FirebaseService();
  const [ticketsAvailable, setTTcketsAvailable] = useState<number>(0);
  const [ticketsEntered, setTicketsEntered] = useState<number>(0);
  const [numCompletedMHTNTasks, setNumCompletedMHTNTasks] = useState<number>(0);
  const [numCompletedBKLYNTasks, setNumCompletedBKLYNTasks] = useState<number>(0);
  const [numCompletedQNSTasks, setNumCompletedQNSTasks] = useState<number>(0);

  let introText: Array<string> = !isFeatureFlagOn(FeatureFlags.RAFFLE_SHUTDOWN_MAY_22) ?
  [
    "1. START BY CHOOSING A BOROUGH AND EXPLORING THE list of activities",
    "2. TAKE A PICTURE WHEN YOU COMPLETE EACH ACTIVITY AND UPLOAD IT",
    "3. WITH EVERY COMPLETION, you get a raffle ticket to enter for a chance to win a giveaway prize of your choice!"
  ] :
  [
    "The event has finished!",
    "Thank you for supporting NYC Chinatowns.",
    "You can view your completed activities and entered raffles, but you are no longer able to complete activities or enter raffles."
  ]

  const fetchCompletedTasksByBorough = async (borough: string) => {
    const completedTasks = Object.keys(await firebaseService.getTasksByBorough(user.uid, borough));
    if (completedTasks.length > 0) {
      switch (borough) {
        case 'Manhattan':
          setNumCompletedMHTNTasks(completedTasks.length);
          break;
        case 'Brooklyn':
          setNumCompletedBKLYNTasks(completedTasks.length);
          break;
        case 'Queens':
          setNumCompletedQNSTasks(completedTasks.length);
      }
    }
  };

  const fetchAvailableRaffleTickets = async () => {
    const fetchedAvailRaffleTix = await firebaseService.getAvailableRaffleTickets(user.uid);
    if (fetchedAvailRaffleTix !== null) {
      setTTcketsAvailable(fetchedAvailRaffleTix);
    }
  };

  const fetchEnteredRaffleTickets = async () => {
    const fetchedEnteredRaffleTix = await firebaseService.getEnteredRaffleTickets(user.uid);
    if (fetchedEnteredRaffleTix !== null) {
      setTicketsEntered(fetchedEnteredRaffleTix);
    }
  };


  useEffect(() => {
    if (user) {
      fetchCompletedTasksByBorough('Manhattan');
      fetchCompletedTasksByBorough('Brooklyn');
      fetchCompletedTasksByBorough('Queens');
      fetchAvailableRaffleTickets();
      fetchEnteredRaffleTickets();
    }
  }, [user]);

  const ticketsData = {
    ticketsAvailable,
    ticketsEntered,
  }

  return (
    <HomeContainer>
      <HomeButton/>
      <Instructions>
        <NumberLine bold color="#ffff">
          <span>{introText[0]}</span>
        </NumberLine>
        <NumberLine bold color="#ffff">
          <span>{introText[1]}</span>
        </NumberLine>
        <NumberLine bold color="#ffff">
          <span>{introText[2]}</span>
        </NumberLine>
      </Instructions>
      <Boroughs>
        <BoroughButton borough="Manhattan" totalTasks={33} completedTasks={numCompletedMHTNTasks}/>
        <BoroughButton borough="Queens" totalTasks={33} completedTasks={numCompletedQNSTasks}/>
        <BoroughButton borough="Brooklyn" totalTasks={33} completedTasks={numCompletedBKLYNTasks}/>
        <MapLink href="https://www.google.com/maps/d/u/0/viewer?mid=1l4O6_kQL21lIP7K6SzS3ZEs6uAp2npM&ll=40.68204387481424%2C-73.9058136434832&z=10" target="_blank" rel="noreferrer">
          <BodyTextMedium bold size="14px">Explore Via Our Map</BodyTextMedium>
          <MapIcon />
        </MapLink>
      </Boroughs>
      <TicketsCounter ticketsData={ticketsData}/>
      <Footer/>
    </HomeContainer>
  );
}

export default Home;