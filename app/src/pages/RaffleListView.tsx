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
import { fetchEnteredRaffleTickets } from "../utils/user";

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
    const [enteredTickets, setEnteredTickets] = useState<number>(0);


    useEffect(() => {
        (async () => {
            if(user) {
                const avail = await fetchAvailableRaffleTickets(firebaseService, user);
                if (avail) {
                    setAvailableTickets(avail);
                }
                //TODO: may need some updates here when we finish storing total entered tickets in the DB properly
                const entered = await fetchEnteredRaffleTickets(firebaseService, user);
                if (entered) {
                    setEnteredTickets(entered)
                }
            }
        })();

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
                    <RaffleEntry
                        user={user}
                        availableTickets={availableTickets}
                        setAvailableTickets={setAvailableTickets}
                        prizeData={selectedGiveaway}
                        setIsPopupActive={setIsPopupActive}
                    /> 
                </>
                ) : (
                <>
                    <BackButton onClick={() => {navigate('/', { replace: true })}}/>
                    <RaffleHeader enteredTickets={enteredTickets} availableTickets={availableTickets}></RaffleHeader>
                    <RaffleList user={user} prizeData={prizeData} setSelectedGiveaway={setSelectedGiveaway}></RaffleList>
                </>
                ) 
            }

        </PageContainer>
        <EntryConfirmationModal isActive={isPopupActive} closeModal={closeModal}/>
        </>
    );
}