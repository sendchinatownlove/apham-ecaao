
import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { FirebaseService } from '../Api';
import BoroughButton from './borough';
import TicketsCounter from './ticketsCounter';
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

const ticketsData = {
  ticketsEntered: 12,
  ticketsAvailable: 2,
}

function Home(props: Props) {
  const { user } = props;
  const firebaseService = new FirebaseService();
  const [availableTix, setAvailableTix] = useState<number>(0);
  const [enteredRaffleTix, setEnteredRaffleTix] = useState<number>(0);
  const [numCompletedMHTNTasks, setNumCompletedMHTNTasks] = useState<number>(0);
  const [numCompletedBKLYNTasks, setNumCompletedBKLYNTasks] = useState<number>(0);
  const [numCompletedQNSTasks, setNumCompletedQNSTasks] = useState<number>(0);

  const fetchCompletedTasksByBorough = async (borough: string) => {
    const numCompletedTasks = await firebaseService.getCompletedTasksByBorough(user.uid, borough);
    if (numCompletedTasks !== null) {
      switch (borough) {
        case 'Manhattan':
          setNumCompletedMHTNTasks(numCompletedTasks);
          break;
        case 'Brooklyn':
          setNumCompletedBKLYNTasks(numCompletedTasks);
          break;
        case 'Queens':
          setNumCompletedQNSTasks(numCompletedTasks);
      }
    }
  };

  const fetchAvailableRaffleTickets = async () => {
    const fetchedAvailRaffleTix = await firebaseService.getAvailableRaffleTickets(user.uid);
    if (fetchedAvailRaffleTix !== null) {
      setAvailableTix(fetchedAvailRaffleTix);
    }
  };

  const fetchEnteredRaffleTickets = async () => {
    const fetchedEnteredRaffleTix = await firebaseService.getEnteredRaffleTickets(user.uid);
    if (fetchedEnteredRaffleTix !== null) {
      setEnteredRaffleTix(fetchedEnteredRaffleTix);
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
  })

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
          <span>TAKE A PICTURE WHEN YOU COMPLETE EACH TASK AND UPLOAD IT</span>
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
<<<<<<< HEAD:app/src/pages/Home.tsx
      <TicketsCounter ticketsData={ticketsData}/>
=======
      <TicketsCounter availTix={availableTix} enteredTix={enteredRaffleTix}/>
>>>>>>> 55f7b63 (SCL-25: Homepage - Link user data for tasks and raffle tickets (#30)):app/src/home/index.tsx
      <Footer/>
    </HomeContainer>
  );
}

export default Home;