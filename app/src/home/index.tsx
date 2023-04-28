
import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { FirebaseService } from '../Api';
import BoroughButton from './borough';
import TicketsCounter from './ticketsCounter';
import { BodyTextMedium } from "../components/theme";
import styled from "styled-components";
import HomeButton from "../components/header-buttons/homeButton";
import Footer from "../components/shared/footer";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.3);
  width: 98vw;
  text-align: center;
  height: 110vh;
  margin-top: 30px;
  max-width: 1200px;
  gap: 20px;
  border-top-left-radius: 36px;
  border-top-right-radius: 36px;

`;

const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  width: 88vw;
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

  // TODO: current returns error
  const fetchEnteredRaffleTickets = async () => {
    const fetchedEnteredRaffleTix = await firebaseService.getEnteredRaffleTickets(user.uid);
    console.log("entered raffle tickets ", enteredRaffleTix);

    if (fetchedEnteredRaffleTix !== null) {
      setAvailableTix(fetchedEnteredRaffleTix);
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
      <TicketsCounter availTix={availableTix} enteredTix={enteredRaffleTix}/>
      <Footer/>
    </HomeContainer>
  );
}

export default Home;