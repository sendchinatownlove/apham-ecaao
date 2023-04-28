import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import styled from "styled-components";
import BackButton from "../header-buttons/backButton";
import RaffleHeader from "./RaffleHeader";
import RaffleList, { RafflePrizeData } from "./RaffleList";
import EntryConfirmationModal from "./EntryConfirmationModal";

const RaffleViewContainer = styled.div`
  background-color: rgba(255,255,255,0.3);
  border-radius: 25px;
  text-align: center;
  width: 98vw;
  height: auto;
  max-width: 1200px;
  margin-top: 30px;
`

type RaffleViewProps = {
    prizeData: RafflePrizeData[];
}

export default function RaffleListView(props: RaffleViewProps) {
    const { prizeData } = props;

    let navigate = useNavigate();
    const [isPopupActive, setIsPopupActive] = useState(false);

    return (
        <>
        <RaffleViewContainer>
            <BackButton onClick={() => {navigate('/', { replace: true })}}/>
            <RaffleHeader enteredTickets={11} availableTickets={6}></RaffleHeader>
            <RaffleList></RaffleList>
        </RaffleViewContainer>
        <EntryConfirmationModal isActive={isPopupActive} setIsActive={setIsPopupActive}/>
        </>
    );
}