import styled from "styled-components";
import { RafflePrizeData } from "./RaffleList";

const TicketReqText = styled.span`
    color: white;
    background-color: #DD678A;
    font-weight: 700;
    font-size: 10px;
    letter-spacing 0.15em;
    border: 1px solid #DD678A;
    border-radius: 8px;
    padding: 2px 10px;
    text-transform: uppercase;
    line-height: 13.62px;
`

const EntriesText = styled.span`
    color: #DD678A;
    background-color: white;
    font-weight: 700;
    font-size: 10px;
    letter-spacing 0.15em;
    border: 1px solid #DD678A;
    border-radius: 8px;
    padding: 2px 10px;
    text-transform: uppercase;
`   
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
            <img src={image} style={{ maxWidth: "200px", maxHeight: "300px" }} />
        </PrizeImage>

        <PrizeCaption>
            <PrizeTitle>{title}</PrizeTitle>
            <PrizeDetails>Includes: <br />
                {longDescription.map((bullet, index) => {
                    return <span key={index}>{"• " + bullet} <br /></span>
                })} 
            </PrizeDetails>
        </PrizeCaption>
    </>
    );
}