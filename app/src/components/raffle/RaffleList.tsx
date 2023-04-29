import styled from "styled-components";
import GiveAwaysDetail from "./GiveAwaysDetail";
import RafflePrize from "./RafflePrize"

const RaffleListContainer = styled.div`
    height: calc(100% - 136px); // 136px is the height of the back button and raffle header, needed to show the whole list without getting cutoff
    overflow: scroll;
    background-color: rgba(255, 255, 255);
    color: #000000;
`

const RafflePrizeListContainer = styled.div`
    padding: 0 14px;
`

export type RafflePrizeData = {
    title: string;
    description: string;
    longDescription: string[];
    image: string;
    ticketsRequired: number;
    entries?: number;
    id?: string;
}

type RaffleListProps = {
    prizeData: RafflePrizeData[];
    setSelectedGiveaway: Function;
}


export default function RaffleList(props: RaffleListProps) {
    const { prizeData, setSelectedGiveaway } = props;

    return (
        <RaffleListContainer>
            <GiveAwaysDetail numberOfEntries={3}/>
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