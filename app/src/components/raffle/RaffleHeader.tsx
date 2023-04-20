import styled from "styled-components";

const RaffleHeaderContainer = styled.div`
    background-color: #F9CA4E;
    color: #A8192E;
    font-size: 0.8em;
`

const EnteredTicketsText = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 0;
`

const AvailableTicketsText = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
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
        topElement = <h3>GIVEAWAYS</h3>
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