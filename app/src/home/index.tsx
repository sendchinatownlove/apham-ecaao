
import React, { useEffect, useState } from 'react';
import BoroughButton from './borough';
import TicketsCounter from './ticketsCounter';
import { BodyTextMedium } from "../components/theme";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
`

const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  width: 90vw;
  margin: 1rem 1.5rem 0;
`;

const Boroughs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

interface Props {
  user: Object,
}

function Home(props: Props) {

  return (
    <HomeContainer>
      <Instructions>
        <BodyTextMedium bold color="#ffff">1. START BY CHOOSING A BOROUGH AND EXPLORING THE list of activities</BodyTextMedium>
        <BodyTextMedium bold color="#ffff">2. TAKE A PICTURE WHEN YOU COMPLETE EACH TASK AND UPLOAD IT</BodyTextMedium>
        <BodyTextMedium bold color="#ffff">3. WITH EVERY COMPLETION, you get a raffle ticket to enter for a chance to win a giveaway prize of your choice!</BodyTextMedium>
      </Instructions>
      <Boroughs>
        <BoroughButton borough="Manhattan" totalTasks={33} completedTasks={0}/>
        <BoroughButton borough="Queens" totalTasks={33} completedTasks={0}/>
        <BoroughButton borough="Brooklyn" totalTasks={33} completedTasks={0}/>
      </Boroughs>
      <TicketsCounter/>
    </HomeContainer>
  );
}

export default Home;