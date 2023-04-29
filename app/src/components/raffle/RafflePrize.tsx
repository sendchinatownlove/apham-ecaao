
import { RafflePrizeData } from "./RaffleList";
import styled from "styled-components";

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

const TicketIcon = styled.img`
    content: url("/ticket-icon.svg");
`

const TicketsRequired = styled.div`
    color: #FFFFFF;
    font-size: 0.7em;
    font-weight: 700;
    // position: relative;
    // bottom: 2.3em;
    width: 24px;
    height: 20px;
    background-image: url("/ticket-icon.svg");
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

const PrizeDetails = styled.span`
    display: block;
    font-size: 11px;
    letter-spacing: 0.15em;
    position: relative;
    bottom: 0.4em;
`

type RaffleListProps = {
  prize: RafflePrizeData;
  setSelectedGiveaway: Function;
}
export default function RafflePrize(props: RaffleListProps) {
  const { title, subtitle, image, ticketsRequired} = props.prize;

  return(
      <RafflePrizeContainer onClick={() => props.setSelectedGiveaway(props.prize)}>
        <PrizeDescriptionContainer>
            <TicketContainer>
                {/* <TicketIcon /> */}
                <TicketsRequired>{ticketsRequired}</TicketsRequired>
            </TicketContainer>
            <PrizeCaption>
                <PrizeTitle>{title.toUpperCase()}</PrizeTitle>
                <PrizeDetails>{subtitle.toUpperCase()}</PrizeDetails>
            </PrizeCaption>
        </PrizeDescriptionContainer>
        <img src={image} style={{ maxWidth: "85%", maxHeight: "300px" }}/>
      </RafflePrizeContainer>
  )
}