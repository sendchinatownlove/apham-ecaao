import BoroughButton from './borough';
import TicketsCounter from './ticketsCounter';
import FooterSeparator from "../assets/footerSeparator.svg";
import { BodyTextMedium } from "../components/theme";
import HomeButton from "../components/headerButtons/HomeButton";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  border-radius: 20px;
  padding: 24px; 
  background: rgba(255, 255, 255, 0.3);
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

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 21px;
`;


interface Props {
  user: Object,
}

function Home(props: Props) {

  return (
    <HomeContainer>
      <HomeButton />
      <Instructions>
        <BodyTextMedium bold>1. START BY CHOOSING A BOROUGH AND EXPLORING THE list of activities</BodyTextMedium>
        <BodyTextMedium bold>2. TAKE A PICTURE WHEN YOU COMPLETE EACH TASK AND UPLOAD IT</BodyTextMedium>
        <BodyTextMedium bold>3. WITH EVERY COMPLETION, you get a raffle ticket to enter for a chance to win a giveaway prize of your choice!</BodyTextMedium>
      </Instructions>
      <Boroughs>
        <BoroughButton borough="Manhattan" totalTasks={33} completedTasks={0}/>
        <BoroughButton borough="Queens" totalTasks={33} completedTasks={0}/>
        <BoroughButton borough="Brooklyn" totalTasks={33} completedTasks={0}/>
      </Boroughs>
      <TicketsCounter/>
      <Footer>
        <img src={FooterSeparator} />
        <BodyTextMedium bold>
          READ ABOUT THIS EVENT
        </BodyTextMedium>
        <BodyTextMedium bold>
          @SENDCHINATOWNLOVE
        </BodyTextMedium>
      </Footer>
      
    </HomeContainer>
  );
}

export default Home;