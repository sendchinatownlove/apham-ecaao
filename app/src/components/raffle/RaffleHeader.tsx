import styled from "styled-components";

const RaffleHeaderContainer = styled.div`
    background-color: #F9CA4E;
    color: #A8192E;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-size: 0.8em;
    padding: 10px 14px;
`

const EnteredTicketsText = styled.p`
    display: flex;
    justify-content: space-between; 
    align-items: center;
    font-size: 11px;
    letter-spacing: 0.15em;
    margin: 9.38px 0;
    height: 15px;

    span:nth-child(2) {
        font-size: 14px;
    }
`

const AvailableTicketsText = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    letter-spacing: 0.15em;
    margin: 0;
    height: 17px;

    span:nth-child(2) {
        font-size: 14px;
    }
`

const GiveawaysText = styled.div`
    display: flex;
    justify-content: space-between; 
    align-items: center;
    font-size: 14px;
    letter-spacing: 0.15em;
    margin: 9.38px 0;
    height: 15px;
    font-weight: 700;
`

type RaffleHeaderProps = {
    availableTickets: number;
    enteredTickets?: number;
}

export default function RaffleHeader(props: RaffleHeaderProps) {
    const { enteredTickets, availableTickets } = props;
    let topElement;
    if (enteredTickets) {
        topElement = <EnteredTicketsText><span>MY ENTERED RAFFLE TICKETS</span><span>{enteredTickets}</span></EnteredTicketsText>
    } else {
        topElement = <GiveawaysText>Giveaways</GiveawaysText>
    }

    return(
        <RaffleHeaderContainer>
            {topElement}
            <AvailableTicketsText>
                <span>MY AVAILABLE RAFFLE TICKETS</span>
                <span>{availableTickets}</span>
            </AvailableTicketsText>
        </RaffleHeaderContainer>
    )
}