
import { useNavigate } from "react-router-dom";
import { LabelMedium, THEME_COLORS, PrimaryButton } from "../theme";
import TicketsDataProptype from "../../propTypes/ticketsData";
import styled from "styled-components";
import {FeatureFlags, isFeatureFlagOn} from "../../utils/featureFlags";

const TicketsCounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props: TicketsDataProptype) => !props.ticketsAvailable ? THEME_COLORS.PINK : "#FEC050"};
  border-radius: 16px;
  padding: 14.5px 19px;
`

const ContentContainer = styled.div`
  display: flex;
  text-transform: uppercase;
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
  text-align: left;
`;

const TicketSubHeader = styled(TicketLabel)`
  font-size: 11px;
  color: ${THEME_COLORS.RED};
`;

const ButtonContainer = styled.div`
  width: 50%;
`;

const Header = styled(LabelMedium)`
  text-align: start;
  margin-bottom: 9px;
`;

interface Props {
  ticketsData: TicketsDataProptype,
}

function TicketsCounter(props: Props) {
  const { ticketsAvailable, ticketsEntered } = props.ticketsData;
  const navigate = useNavigate();

  return (
    <TicketsCounterContainer ticketsAvailable={ticketsAvailable} ticketsEntered={ticketsEntered}>
      <Header upperCase color={THEME_COLORS.RED}>My raffle tickets</Header>
      {
        !ticketsAvailable && !ticketsEntered ? (
          <TicketSubHeader >
            YOU HAVE NO TICKETS AVAILABLE YET! COMPLETE SOME TASKS TO GET STARTED
          </TicketSubHeader>
        ) : (
          <ContentContainer>
          <TicketData>
            <div>
              <NumberValue>{ticketsAvailable}</NumberValue>  <TicketLabel>Available</TicketLabel>
            </div>
            <div>
              <NumberValue>{ticketsEntered}</NumberValue>  <TicketLabel>Entered</TicketLabel>
            </div>
          </TicketData>
          <ButtonContainer>
            <PrimaryButton onClick={() => navigate("/raffles")}>
              { isFeatureFlagOn(FeatureFlags.RAFFLE_SHUTDOWN_MAY_22) || !ticketsAvailable ? "View" : "Enter"} Raffles
            </PrimaryButton>
          </ButtonContainer>
        </ContentContainer>
        )
      }
    </TicketsCounterContainer>
  );
}

export default TicketsCounter;