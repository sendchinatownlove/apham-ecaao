import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../headerButtons/BackButton";
import RaffleHeader from "./RaffleHeader";
import RaffleList, { RafflePrizeData } from "./RaffleList";

const RaffleViewContainer = styled.div`
  background-color: rgba(255,255,255,0.3);
  border-radius: 25px;
  min-height: 480px;
  max-width: 350px;
  text-align: center;
  margin-top: 20px;
`

type RaffleViewProps = {
    prizeData: RafflePrizeData[];
}

export default function RaffleListView(props: RaffleViewProps) {
    const { prizeData } = props;

    let navigate = useNavigate();

    return (
        <RaffleViewContainer>
            <BackButton onClick={() => {navigate('/', { replace: true })}}/>
            <RaffleHeader enteredTickets={11} availableTickets={6}></RaffleHeader>
            <RaffleList prizeData={prizeData}></RaffleList>
        </RaffleViewContainer>
    );
}