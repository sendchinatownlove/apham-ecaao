
import { RafflePrizeData } from "./RaffleList";
import styled from "styled-components";
import {BubbleLabel} from "../theme";
import {useEffect, useState} from "react";
import {FirebaseService} from "../../Api";

const RafflePrizeContainer = styled.div`
    margin: 0 auto 16px;
    padding-bottom: 14px;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`

const PrizeDescriptionContainer = styled.div`
    display: flex;
    line-height: 1.25em;
    margin: 8px 15px 16px;
`

const TicketContainer = styled.div`
    max-width: fit-content;
    margin-top: 5px;
    margin-right: 9px;
`

const TicketsRequiredEnabled = styled.div`
    color: #FFFFFF;
    font-size: 0.7em;
    font-weight: 700;
    width: 24px;
    height: 20px;
    background-image: url("/pink-ticket-icon.svg");
`

const TicketsRequiredDisabled = styled.div`
    color: #FFFFFF;
    font-size: 0.7em;
    font-weight: 700;
    width: 24px;
    height: 20px;
    background-image: url("/gray-ticket-icon.svg");
`

const PrizeCaption = styled.div`
    text-align: left;
`

const PrizeTitle = styled.span`
    display: inline-block;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.15em;
`

const PrizeSubtitle = styled.span`
    display: block;
    font-size: 11px;
    letter-spacing: 0.15em;
    position: relative;
    bottom: 0.4em;
`
const PrizeContainer = styled.div`
    position: relative;
    display: inline-block;
`;
const PrizeImage = styled.img`
    border-radius: 9px;
    border: 1px solid #EAEAEA;
    margin-left: 8px;
    position: relative;
    min-height: 184px;
    min-width: 394px;
    maxWidth: 85%;
    maxHeight: 300px;
    display: block;
`;

const EntryPill = styled(BubbleLabel)`
    position: absolute;
    bottom: 10px;
    right: 10px;
`;

type RaffleListProps = {
  prize: RafflePrizeData;
  setSelectedGiveaway: Function;
  availableTickets: number;
  entries: number;
  userId: string;
}

type TicketIconProps = {
    ticketsRequired: number;
    availableTickets: number;
}

function TicketIcon({ticketsRequired, availableTickets}: TicketIconProps) {
    if (availableTickets >= ticketsRequired) {
        return <TicketsRequiredEnabled>{ticketsRequired}</TicketsRequiredEnabled>
    } else {
        return <TicketsRequiredDisabled>{ticketsRequired}</TicketsRequiredDisabled>
    }
}

export default function RafflePrize(props: RaffleListProps) {
  const { title, subtitle, image, ticketsRequired, dollarValue, id} = props.prize;
  const availableTickets = props.availableTickets;
  const userId = props.userId;
  const [hasEntries, setHasEntries] = useState(false);
  const [entryText, setEntryText] = useState("");

  useEffect(() => {
      async function getEntries() {
          const firebaseService = new FirebaseService();
          if (id) {
              const entries = await firebaseService.getEntriesForRaffle(userId, id) || 0;
              if (entries > 0) {
                setEntryText(`ENTRIES: ${entries}`);
                setHasEntries(true);
              }
          }
      }
      getEntries();
  });

  return(
      <RafflePrizeContainer onClick={() => props.setSelectedGiveaway(props.prize)}>
        <PrizeDescriptionContainer>
            <TicketContainer>
                <TicketIcon ticketsRequired={ticketsRequired} availableTickets={availableTickets}></TicketIcon>
            </TicketContainer>
            <PrizeCaption>
                <PrizeTitle>{title.toUpperCase()}</PrizeTitle>
                <PrizeSubtitle>{subtitle.toUpperCase()} {dollarValue ? `- $${dollarValue} VALUE` : ''}</PrizeSubtitle>
            </PrizeCaption>
        </PrizeDescriptionContainer>
        <PrizeContainer>
          <PrizeImage src={image}/>
            {hasEntries ? (<EntryPill>{entryText}</EntryPill>) : <></>}
        </PrizeContainer>
      </RafflePrizeContainer>
  )
}