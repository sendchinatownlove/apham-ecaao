import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RaffleHeader from "./RaffleHeader";
import { RafflePrizeData } from "./RaffleList";
import RaffleEntryItem from "./RaffleEntryItem";
import BackButton from "../shared/BackButton";


const RaffleContainer = styled.div`
  background-color: rgba(255,255,255,0.3);
  border-radius: 25px;
  text-align: center;
  width: 98vw;
  height: auto;
  max-width: 1200px;
  margin-top: 30px;
  `

  const RaffleEntryContainer = styled.div`
  height: 98vh;
  max-width: 300px
  overflow: scroll;
  background-color: #FFF1F1;
  color: #000000;
  border-radius: 0px 0px 25px 25px;
  padding: 2.5vh 1.5rem;
  border-top: 1px solid #A8192E;
`

const EntryButtonContainer = styled.div`

`
const EntryButton = styled.button<{ isDisabled: boolean }>`
    background: ${props => props.isDisabled ? "#8B8B8B" : "#343434"};
    border-radius: 50px;
    width: 100%;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: white;
    font-weight: 700;
    margin-top: 30px;
    font-size: 14px;
    line-height: 19.07px;
    padding: 0.6em 1.2em;
`

const NoticeText = styled.div`
    font-size: 11px;
    margin: 15px 0px
`
// TODO add navigation logic
function handleEntryButtonClick(){
    // let navigate = useNavigate();
    console.log("Submit Button Clicked"); 
}

export default function RaffleEntry(props: RafflePrizeData) {
    const { title, description, longDescription, image, ticketsRequired, entries} = props;
    let navigate = useNavigate();
    // TODO: Add logic if available tickets - tickets required > 0
    let hasEnoughTickets = true;
    

    return (
        <RaffleContainer>
            <BackButton text="CANCEL" onClick={() => {navigate(-1)}}/>
            <RaffleHeader availableTickets={6} />
            <RaffleEntryContainer>
                <RaffleEntryItem 
                    title ={title}
                    description={description}
                    longDescription={longDescription}
                    image={image}
                    ticketsRequired={ticketsRequired}
                    entries={entries} />
                <EntryButtonContainer>
                    <EntryButton 
                        isDisabled={!hasEnoughTickets}
                        disabled={!hasEnoughTickets}
                        // TODO: navigate back to task list page and deactivate button when not enough tickets
                        onClick={handleEntryButtonClick}>
                        Confirm Entry
                    </EntryButton>
                    <NoticeText> Once an entry is submitted, it cannot be changed.</NoticeText>
                </EntryButtonContainer>
            </RaffleEntryContainer>
        </RaffleContainer> 
    );   
}
