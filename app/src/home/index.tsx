
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
  user: Object,
}

function Home(props: Props) {

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
        <BoroughButton borough="Manhattan" totalTasks={33} completedTasks={0}/>
        <BoroughButton borough="Queens" totalTasks={33} completedTasks={0}/>
        <BoroughButton borough="Brooklyn" totalTasks={33} completedTasks={0}/>
      </Boroughs>
      <TicketsCounter/>
      <Footer/>
    </HomeContainer>
  );
}

export default Home;