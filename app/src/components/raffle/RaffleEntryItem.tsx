import styled from "styled-components";
import { RafflePrizeData } from "./RaffleList";

const TicketReqText = styled.span`
    color: white;
    background-color: #DD678A;
    font-weight: 600;
    font-size: 0.6em;
    letter-spacing 0.15em;
    border: 1px solid #DD678A;
    border-radius: 8px;
    padding: 2px 16px;
    text-transform: uppercase;
`

const EntriesText = styled.span`
    color: #DD678A;
    background-color: white;
    font-weight: 600;
    font-size: 0.6em;
    letter-spacing 0.15em;
    border: 1px solid #DD678A;
    border-radius: 8px;
    padding: 2px 16px;
    text-transform: uppercase;
`   
const EntryHeaderText = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px
`
const PrizeImage = styled.div`
    margin-top: 20px;

`
const PrizeCaption = styled.div`
    text-align: left;
`

const PrizeTitle = styled.div`
    margin: 30px 0px
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
`

const PrizeDetails = styled.div`
    display: inline-block;
    font-size: 0.8em;
`

function TicketReq(props: {ticketsRequired: number}) {
    const {ticketsRequired} = props;

    let text;
   if (ticketsRequired > 1) {
        text = <TicketReqText>{ticketsRequired} Raffle Tickets Required</TicketReqText>
    } else if (ticketsRequired == 1){
        text = <TicketReqText>1 Raffle Ticket Required</TicketReqText>
    }else {
        text = <TicketReqText>No Raffle Ticket Required</TicketReqText>
    }
    return text
}

function Entries(props: {numEntries: number | undefined}) {
    const {numEntries} = props;

    let text;
    if(numEntries == undefined) { // remove once numEntries is required
        text = <span></span>
    } else if (numEntries > 1) {
        text = <EntriesText>{numEntries} Entries</EntriesText>
    } else if (numEntries == 1){
        text = <EntriesText>1 Entry</EntriesText>
    }else {
        text = <EntriesText>No Entries Yet</EntriesText>
    }
    return text
}

export default function RaffleEntryItem(props: RafflePrizeData) {
    const { title, description, longDescription, image, ticketsRequired, entries} = props;

    return (
    <>
     <EntryHeaderText>
            <TicketReq ticketsRequired={ticketsRequired} />
        </EntryHeaderText>
        <EntryHeaderText>
            <Entries numEntries = {entries} />
        </EntryHeaderText>
        
        <PrizeImage>
            {/* TODO: Something is off about the image formatting */}
            <img src={image} />
        </PrizeImage>

        <PrizeCaption>
            <PrizeTitle>{title}</PrizeTitle>
            <PrizeDetails>Includes: <br />
                {longDescription.map((bullet) => {
                    return <span>{"- " + bullet} <br /></span>
                })} 
            </PrizeDetails>
        </PrizeCaption>
    </>
    );
}