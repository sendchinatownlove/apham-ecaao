import styled from "styled-components";

const RaffleHeaderContainer = styled.div`
    background-color: #F9CA4E;
    color: #A8192E;
    letter-spacing: 0.15em;
    text-transform: uppercase;
`

const EnteredTicketsText = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 0;
    font-size: 0.7em;
`

const AvailableTicketsText = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    font-size: 0.7em;
`

const GiveawaysText = styled.div`
    display: flex;
    font-weight: bold;
    justify-content: space-between;
    padding: 10px 10px 0;
    text-transform: uppercase;
    font-size: 0.9em;
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