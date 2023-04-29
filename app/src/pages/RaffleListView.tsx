import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import BackButton from "../components/header-buttons/backButton";
import RaffleHeader from "../components/raffle/RaffleHeader";
import { PageContainer } from "../components/theme";
import RaffleList, { RafflePrizeData } from "../components/raffle/RaffleList";
import EntryConfirmationModal from "../components/raffle/EntryConfirmationModal";

type RaffleViewProps = {
    prizeData: RafflePrizeData[];
}

export default function RaffleListView(props: RaffleViewProps) {
    const { prizeData } = props;

    let navigate = useNavigate();
    const [isPopupActive, setIsPopupActive] = useState(false);

    return (
        <>
        <PageContainer>
            <BackButton onClick={() => {navigate('/', { replace: true })}}/>
            <RaffleHeader enteredTickets={11} availableTickets={6}></RaffleHeader>
            <RaffleList prizeData={prizeData}></RaffleList>
        </PageContainer>
        <EntryConfirmationModal isActive={isPopupActive} setIsActive={setIsPopupActive}/>
        </>
    );
}