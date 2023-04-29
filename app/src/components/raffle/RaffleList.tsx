import styled from "styled-components";
import GiveAwaysDetail from "./GiveAwaysDetail";
import RafflePrize from "./RafflePrize"
import { FirebaseService } from "../../Api";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

const RaffleListContainer = styled.div`
    height: calc(100% - 136px); // 136px is the height of the back button and raffle header, needed to show the whole list without getting cutoff
    background-color: rgba(255, 255, 255);
    color: #000000;
`

const RafflePrizeListContainer = styled.div`
    padding: 0 14px 8px;
    background-color: rgb(255, 255, 255);
`

export type RafflePrizeData = {
    title: string;
    subtitle: string,
    description: string;
    image: string;
    ticketsRequired: number;
    entries?: number;
    id?: string;
}

type RaffleListProps = {
    prizeData: RafflePrizeData[];
    setSelectedGiveaway: Function;
    user: User;
}


export default function RaffleList(props: RaffleListProps) {
    const { prizeData, setSelectedGiveaway, user } = props;
    const [entries, setEntries] = useState<number>(0);

    const fireBaseService = new FirebaseService();

    useEffect(() => {
        (async () => {
            //TODO: may need some updates here when we finish storing total entered tickets in the DB properly
            if (user) {
                const entries = await fireBaseService.getEnteredRaffleTickets(user.uid);
                if (entries) {
                    setEntries(entries!);
                }
            }
        })();
    })

    return (
        <RaffleListContainer>
            <GiveAwaysDetail numberOfEntries={entries}/>
            <RafflePrizeListContainer>
                {prizeData.map((prize, index) => (
                    <RafflePrize
                        key={prize.id}
                        prize={prize}
                        setSelectedGiveaway={setSelectedGiveaway}
                    />
                ))}
            </RafflePrizeListContainer>
        </RaffleListContainer>
    );
}