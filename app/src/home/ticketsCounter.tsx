
import { useNavigate } from "react-router-dom";
import { LabelMedium, THEME_COLORS } from "../components/theme";
import styled from "styled-components";

const TicketsCounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${THEME_COLORS.GOLD};
  border-radius: 16px;
  padding: 14.5px 19px;
`

const ContentContainer = styled.div`
  display: flex;
`

const TicketData = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const NumberValue = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.15em;
`;

const TicketLabel = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.15em;
`;

const RafflesButton = styled.button`
  background: ${THEME_COLORS.RED};
  padding: 13px 12px;
  border-radius: 40px;
  width: 50%;
`;

const Header = styled(LabelMedium)`
  text-align: start;
`;

interface Props {
  availTix: number,
  enteredTix: number
}

function TicketsCounter(props: Props) {
  const { availTix, enteredTix } = props;
  const navigate = useNavigate();

  return (
    <TicketsCounterContainer>
      <Header upperCase color={THEME_COLORS.RED}>My raffle tickets</Header>
      <ContentContainer>
        <TicketData>
          <div>
            <NumberValue>{availTix}</NumberValue>  <TicketLabel>Available</TicketLabel>
          </div>
          <div>
            <NumberValue>{enteredTix}</NumberValue>  <TicketLabel>Entered</TicketLabel>
          </div>
        </TicketData>
        <RafflesButton onClick={() => navigate("/raffles")}>
          Enter Raffles
        </RafflesButton>
      </ContentContainer>
    </TicketsCounterContainer>
  );
}

export default TicketsCounter;