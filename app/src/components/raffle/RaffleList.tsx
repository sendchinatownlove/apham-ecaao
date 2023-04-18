import styled from "styled-components";

const RaffleListContainer = styled.div`
    max-height: 450px;
    overflow: scroll;
    background-color: rgba(255, 255, 255);
    color: #000000;
    border-radius: 0px 0px 25px 25px;
`

const PageTitleText = styled.div`
    border-top: 1px solid #A8192E;
    padding: 16px 14px 8px;
    display: flex;
    justify-content: space-between;
`

const GiveawaysText = styled.span`
    color: #A8192E;
    font-weight: 700;
    padding-top: 3px;
`

const EntriesText = styled.span`
    color: #DD678A;
    font-weight: 700;
    font-size: 0.8em;
    border: 1px solid #DD678A;
    border-radius: 8px;
    padding: 3px 16px;
`

const PageDescription = styled.div`
    color: #000000;
    text-align: left;
    padding: 8px 14px 23px;
    font-size: 0.9em;
`

const RafflePrizeContainer = styled.div`
    max-width: 332px;
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

const TicketsRequired = styled.span`
    color: #FFFFFF;
    font-size: 0.7em;
    font-weight: 700;
    position: relative;
    bottom: 2.3em;
`

const PrizeCaption = styled.div`
    text-align: left;
`

const PrizeTitle = styled.span`
    display: inline-block;
    font-weight: 700;
`

const PrizeDetails = styled.span`
    display: inline-block;
`

export type RafflePrizeData = {
    title: string;
    description: string;
    image: string;
    ticketsRequired: number;
}

type RaffleListProps = {
    prizeData: RafflePrizeData[];
}

function RafflePrize(props: RafflePrizeData) {
    const { title, description, image, ticketsRequired } = props;

    return(
        <RafflePrizeContainer>
            <PrizeDescriptionContainer>
                <TicketContainer>
                    <TicketIcon />
                    <TicketsRequired>{ticketsRequired}</TicketsRequired>
                </TicketContainer>
                <PrizeCaption>
                    <PrizeTitle>{title.toUpperCase()}</PrizeTitle>
                    <PrizeDetails>{description.toUpperCase()}</PrizeDetails>
                </PrizeCaption>
            </PrizeDescriptionContainer>
            <img src={image} />
        </RafflePrizeContainer>
    )
}

export default function RaffleList(props: RaffleListProps) {
    const { prizeData } = props;

    return (
        <>
            <RaffleListContainer>
                <PageTitleText>
                    <GiveawaysText>GIVEAWAYS</GiveawaysText>
                    <EntriesText>3 ENTRIES</EntriesText>
                </PageTitleText>
                <PageDescription>
                    <span>For every completed activity, you'll earn one (1) raffle ticket. Each giveaway prize is worth a certain number of raffle tickets for one (1) raffle entry. Once you have enough tickets, enter them into the giveaway prize of your choice!</span>
                </PageDescription>
                {prizeData.map((prize, index) => {
                    return <RafflePrize key={index} title={prize.title} description={prize.description} image={prize.image} ticketsRequired={prize.ticketsRequired}></RafflePrize>
                })}
            </RaffleListContainer>
        </>
    );
}