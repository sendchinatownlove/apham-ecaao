import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import styled from "styled-components";
import TaskListBackButton from "../tasks/TaskListBackButton";
import RaffleHeader from "./RaffleHeader";
import RaffleList, { RafflePrizeData } from "./RaffleList";
import EntryConfirmationModal from "./EntryConfirmationModal";

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
    const [isPopupActive, setIsPopupActive] = useState(false);

    return (
        <>
        <RaffleViewContainer>
            <TaskListBackButton onClick={() => {navigate('/', { replace: true })}}/>
            <RaffleHeader enteredTickets={11} availableTickets={6}></RaffleHeader>
            <RaffleList prizeData={prizeData}></RaffleList>
        </RaffleViewContainer>
        <EntryConfirmationModal isActive={isPopupActive} setIsActive={setIsPopupActive}/>
        </>
    );
}