
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { FirebaseService } from '../Api';
import BoroughButton from '../components/home/borough';
import TicketsCounter from '../components/home/ticketsCounter';
import { BodyTextMedium, PageContainer } from "../components/theme";
import styled from "styled-components";
import HomeButton from "../components/header-buttons/homeButton";
import Footer from "../components/shared/footer";

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
          <span>1.</span>
          <span>START BY CHOOSING A BOROUGH AND EXPLORING THE list of activities</span>
        </NumberLine>
        <NumberLine bold color="#ffff">
          <span>2.</span>
          <span>TAKE A PICTURE WHEN YOU COMPLETE EACH ACTIVITY AND UPLOAD IT</span>
        </NumberLine>
        <NumberLine bold color="#ffff">
          <span>3.</span>
          <span>WITH EVERY COMPLETION, you get a raffle ticket to enter for a chance to win a giveaway prize of your choice!</span>
        </NumberLine>
      </Instructions>
      <Boroughs>
        <BoroughButton borough="Manhattan" totalTasks={33} completedTasks={numCompletedMHTNTasks}/>
        <BoroughButton borough="Queens" totalTasks={33} completedTasks={numCompletedQNSTasks}/>
        <BoroughButton borough="Brooklyn" totalTasks={33} completedTasks={numCompletedBKLYNTasks}/>
      </Boroughs>
      <TicketsCounter ticketsData={ticketsData}/>
      <Footer/>
    </HomeContainer>
  );
}

export default Home;