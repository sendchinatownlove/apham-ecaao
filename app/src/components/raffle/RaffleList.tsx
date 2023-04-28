import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const RaffleListContainer = styled.div`
    max-height: 100vh;
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
    font-size: 13px;
`

const EntriesText = styled.span`
    color: #DD678A;
    font-weight: 800;
    font-size: 0.5em;
    border: 1px solid #DD678A;
    border-radius: 8px;
    padding: 3px 16px;
    letter-spacing: 0.055em;
`

const PageDescription = styled.div`
    color: #000000;
    text-align: left;
    padding: 8px 14px 23px;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
`

const RafflePrizeContainer = styled.div`
    max-width: 99vw;
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

export type RafflePrizeData = {
    title: string;
    description: string;
    longDescription: string[];
    image: string;
    ticketsRequired: number;
    // TODO show entries in the Raffle List items
    entries?: number;
}

type RaffleListProps = {
    prizeData: RafflePrizeData[];
}

function RafflePrize(props: RafflePrizeData) {
    const { title, description, longDescription, image, ticketsRequired} = props;

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

export default function RaffleList() {
    const [prizeData, setPrizeData] = useState<any[]>([]);

    useEffect(() => {
        const fetchPrizeData = async() => {
            try {
                const data = await axios.get('https://us-central1-scl-scavengerhunt.cloudfunctions.net/airtable_proxy?table=apahm23_prizes');
                const formattedPrizeData = data.data.map((prize: any) => {
                    return {
                        id: prize.id,
                        ...prize.fields
                    }
                });
                setPrizeData(formattedPrizeData);
                console.log(formattedPrizeData);
            } catch (error) {
                console.log(`There was a problem with retrieving prize data: ${error}`);
            }
        }

        fetchPrizeData();
    }, []);

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
                {prizeData.map((prize) => {
                    return <RafflePrize key={prize.id} title={prize["Prize Title (Brand)"]} description={prize["Prize Subtitle (Item)"]} longDescription={prize["Item Description"]} image={prize["Image URL"]} ticketsRequired={prize["Item Ticket Value"]}></RafflePrize>
                })}
            </RaffleListContainer>
        </>
    );
}