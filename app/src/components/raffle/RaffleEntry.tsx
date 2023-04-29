import styled from "styled-components";
import { RafflePrizeData } from "./RaffleList";
import RaffleEntryItem from "./RaffleEntryItem";
import { User } from "firebase/auth";
import { FirebaseService } from "../../Api";



const RaffleEntryContainer = styled.div`
  height: calc(100% - 144px);
  overflow: scroll;
  background-color: #FFF1F1;
  color: #000000;
  padding: 2.5vh 1.5rem;
  border-top: 1px solid #A8192E;
`
const EntryButton = styled.button<{ isDisabled: boolean }>`
    background: ${props => props.isDisabled ? "#8B8B8B" : "#343434"};
    border-radius: 50px;
    width: 100%;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: white;
    font-weight: 700;
    margin-top: 30px;
    font-size: 14px;
    line-height: 19.07px;
    padding: 0.6em 1.2em;
`

const NoticeText = styled.div`
    font-size: 11px;
    margin: 15px 0px
`
type RaffleViewProps = {
    prizeData: RafflePrizeData;
    setIsPopupActive: Function;
    user: User;
    availableTickets: number;
    setAvailableTickets: Function;
}

export default function RaffleEntry(props: RaffleViewProps) {
    const { title, description, longDescription, image, ticketsRequired, entries, id} = props.prizeData;
    const { user, availableTickets, setAvailableTickets } = props;
    // TODO: Add logic if available tickets - tickets required > 0
    let hasEnoughTickets = availableTickets >= ticketsRequired;

    const fireBaseService = new FirebaseService();

    const handleEntryButtonClick = async () => {
        await fireBaseService.enterRaffle(user.uid, id!, ticketsRequired!);
        setAvailableTickets(availableTickets - ticketsRequired);

        props.setIsPopupActive(true);
    };
    
    return (
        <RaffleEntryContainer>
            <RaffleEntryItem 
                title ={title}
                description={description}
                longDescription={longDescription}
                image={image}
                ticketsRequired={ticketsRequired}
                entries={entries} />
            <div>
                <EntryButton 
                    isDisabled={!hasEnoughTickets}
                    disabled={!hasEnoughTickets}
                    onClick={handleEntryButtonClick}>
                    Confirm Entry
                </EntryButton>
                <NoticeText> Once an entry is submitted, it cannot be changed.</NoticeText>
            </div>
        </RaffleEntryContainer>
    );   
}
