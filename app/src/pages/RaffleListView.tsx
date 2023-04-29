import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { FirebaseService } from '../Api';
import { fetchAvailableRaffleTickets } from '../utils/user';

import BackButton from "../components/header-buttons/backButton";
import CancelButton from "../components/header-buttons/cancelButton";
import RaffleHeader from "../components/raffle/RaffleHeader";
import { PageContainer } from "../components/theme";
import RaffleList, { RafflePrizeData } from "../components/raffle/RaffleList";
import RaffleEntry from "../components/raffle/RaffleEntry";
import EntryConfirmationModal from "../components/raffle/EntryConfirmationModal";

type RaffleViewProps = {
    prizeData: RafflePrizeData[];
    user: User,
}

export default function RaffleListView(props: RaffleViewProps) {
    const { prizeData, user } = props;

    let navigate = useNavigate();
    const firebaseService = new FirebaseService();

    const [isPopupActive, setIsPopupActive] = useState(false);
    const [selectedGiveaway, setSelectedGiveaway] = useState<RafflePrizeData | null>();
    const [availableTickets, setAvailableTickets] = useState<number>(0);


    useEffect(() => {
        if(user) {
            fetchAvailableRaffleTickets(firebaseService, user)
                .then((tickets) => {
                    if (tickets) {
                        setAvailableTickets(tickets);
                    }
                });
            
        }
    }, [user, selectedGiveaway]);

    const closeModal = () => {
        setIsPopupActive(false);
        setSelectedGiveaway(null);
    }

    return (
        <>
        <PageContainer>
            {
                selectedGiveaway ? (
                <>
                    <CancelButton onClick={() => setSelectedGiveaway(null)}/>
                    <RaffleHeader availableTickets={availableTickets} />
                    <RaffleEntry prizeData={selectedGiveaway} setIsPopupActive={setIsPopupActive}/> 
                </>
                ) : (
                <>
                    <BackButton onClick={() => {navigate('/', { replace: true })}}/>
                    <RaffleHeader enteredTickets={11} availableTickets={6}></RaffleHeader>
                    <RaffleList prizeData={prizeData} setSelectedGiveaway={setSelectedGiveaway}></RaffleList>
                </>
                ) 
            }

        </PageContainer>
        <EntryConfirmationModal isActive={isPopupActive} closeModal={closeModal}/>
        </>
    );
}