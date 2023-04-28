
import { useNavigate } from "react-router-dom";
import { LabelMedium, THEME_COLORS, PrimaryButton } from "../theme";
import styled from "styled-components";

const TicketsCounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #FEC050;
  border-radius: 16px;
  padding: 14.5px 19px;
`

const ContentContainer = styled.div`
  display: flex;
  text-transform: uppercase;
  margin-top: 9px;
  align-items: center;
  justify-content: space-between;
`

const TicketData = styled.div`
  display: flex;
  flex-direction: column;
  color: ${THEME_COLORS.RED};
`;

const NumberValue = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.15em;
`;

const TicketLabel = styled.span`
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.15em;
`;

const ButtonContainer = styled.div`
  width: 50%;
`;

const Header = styled(LabelMedium)`
  text-align: start;
`;

interface Props {
  ticketsData?: Object,
}

function TicketsCounter(props: Props) {
  const navigate = useNavigate();

  return (
    <TicketsCounterContainer>
      <Header upperCase color={THEME_COLORS.RED}>My raffle tickets</Header>
      <ContentContainer>
        <TicketData>
          <div>
            <NumberValue>10</NumberValue>  <TicketLabel>Available</TicketLabel>
          </div>
          <div>
            <NumberValue>2</NumberValue>  <TicketLabel>Entered</TicketLabel>
          </div>
        </TicketData>
        <ButtonContainer>
          <PrimaryButton onClick={() => navigate("/raffles")}>
            Enter Raffles
          </PrimaryButton>
        </ButtonContainer>
      </ContentContainer>
    </TicketsCounterContainer>
  );
}

export default TicketsCounter;