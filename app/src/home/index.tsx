
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
  gap: 21px;
  text-align: left;
  width: 325px;
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
        <BodyTextMedium bold>1. START BY CHOOSING A BOROUGH AND EXPLORING THE list of activities</BodyTextMedium>
        <BodyTextMedium bold>2. TAKE A PICTURE WHEN YOU COMPLETE EACH TASK AND UPLOAD IT</BodyTextMedium>
        <BodyTextMedium bold>3. WITH EVERY COMPLETION, you get a raffle ticket to enter for a chance to win a giveaway prize of your choice!</BodyTextMedium>
      </Instructions>
      <Boroughs>
        <BoroughButton borough="Manhattan"/>
        <BoroughButton borough="Queens"/>
        <BoroughButton borough="Brooklyn"/>
      </Boroughs>
      <TicketsCounter/>
    </HomeContainer>
  );
}

export default Home;