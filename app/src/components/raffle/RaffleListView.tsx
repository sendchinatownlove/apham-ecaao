import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TaskListBackButton from "../tasks/TaskListBackButton";
import RaffleHeader from "./RaffleHeader";
import RaffleList, { RafflePrizeData } from "./RaffleList";

const RaffleViewContainer = styled.div`
  background-color: rgba(255,255,255,0.3);
  border-radius: 25px;
  text-align: center;
  width: 98vw;
  height: auto;
  max-width: 1200px;
`

type RaffleViewProps = {
    prizeData: RafflePrizeData[];
}

export default function RaffleListView(props: RaffleViewProps) {
    const { prizeData } = props;

    let navigate = useNavigate();

    return (
        <RaffleViewContainer>
            <TaskListBackButton onClick={() => {navigate('/', { replace: true })}}/>
            <RaffleHeader enteredTickets={11} availableTickets={6}></RaffleHeader>
            <RaffleList prizeData={prizeData}></RaffleList>
        </RaffleViewContainer>
    );
}