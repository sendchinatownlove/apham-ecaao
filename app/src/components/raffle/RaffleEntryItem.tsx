import styled from "styled-components";
import { RafflePrizeData } from "./RaffleList";
import { BubbleLabel } from "../theme";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { FirebaseService } from "../../Api";

const EntryHeaderText = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px
`
const PrizeImage = styled.div`
    margin-top: 20px;
    position: relative;
`
const PrizeCaption = styled.div`
    text-align: left;
    padding-top: 8px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
`

const PrizeTitle = styled.div`
    margin: 30px 0px
    display: inline-block;
    font-weight: 700;
    font-size: 14px;
    line-height: 20.47px
`

const PrizeDetails = styled.div`
    display: inline-block;
    font-size: 0.8em;
    padding-top: 15px;
    font-size: 11px;
    line-height: 16.08px;
`

function TicketReq(props: {ticketsRequired: number}) {
    const {ticketsRequired} = props;

    let text;
   if (ticketsRequired > 1) {
        text = <BubbleLabel secondary>{ticketsRequired} Raffle Tickets Required</BubbleLabel>
    } else if (ticketsRequired == 1){
        text = <BubbleLabel secondary>1 Raffle Ticket Required</BubbleLabel>
    }else {
        text = <BubbleLabel secondary>No Raffle Ticket Required</BubbleLabel>
    }
    return text
}

function Entries(props: {numEntries: number}) {
    const {numEntries} = props;

    let text;
    if (numEntries > 1) {
        text = <BubbleLabel>{numEntries} Entries</BubbleLabel>
    } else if (numEntries == 1){
        text = <BubbleLabel>1 Entry</BubbleLabel>
    }else {
        text = <BubbleLabel>No Entries Yet</BubbleLabel>
    }
    return text
}

type RaffleEntryItemProps = {
    prizeData: RafflePrizeData;
    user: User;
}

export default function RaffleEntryItem(props: RaffleEntryItemProps) {
    const { title, description, image, ticketsRequired, id} = props.prizeData;
    const { user } = props;

    const [entries, setEntries] = useState<number>(0);

    const firebaseService = new FirebaseService();

    useEffect(() => {
        const cancelButton = document.getElementById('cancel-button');
        cancelButton?.scrollIntoView({ behavior: 'auto' });

        (async () => {
            const entries = await firebaseService.getEntriesForRaffle(user.uid, id!);
            if (entries) {
                setEntries(entries);
            }
        })();

    })

    return (
    <>
     <EntryHeaderText>
            <TicketReq ticketsRequired={ticketsRequired} />
        </EntryHeaderText>
        <EntryHeaderText>
            <Entries numEntries = {entries} />
        </EntryHeaderText>
        
        <PrizeImage>
            <img src={image} style={{ maxWidth: "200px", maxHeight: "300px" }} />
        </PrizeImage>

        <PrizeCaption>
            <PrizeTitle>{title}</PrizeTitle>
            <PrizeDetails>Includes: <br />
                {description.split('-').map((bullet, index) => {
                    return <span key={index}>{"• " + bullet} <br /></span>
                })} 
            </PrizeDetails>
        </PrizeCaption>
    </>
    );
}