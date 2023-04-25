import styled from "styled-components";
import {Activities} from "./TaskList";

const StyledTaskListHeader = styled.div`
  background-image: url("/task-list-header.png");
  background-size: 100% 70px;
  color: #A8192E;
  padding: 10px 10px 11px 10px;
`;

const LocationText = styled.h1`
  font-size: 14px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #A8192E;
  display: flex;
  justify-content: space-between;
`

const AvailableTicketsText = styled.p`
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.15em;
  display: flex;
  justify-content: space-between;
`

type TaskListHeaderProps = {
  location: string;
  totalActivities: number;
  activitiesCompleted: number;
  availableTickets: number;
}

export default function TaskListHeader(props: TaskListHeaderProps) {
    const { location, activitiesCompleted, totalActivities, availableTickets } = props;
  return (
    <StyledTaskListHeader>
      <LocationText>
        <span>{location.toUpperCase()}</span>
              <span>{activitiesCompleted}/{totalActivities}</span>
      </LocationText>
      <AvailableTicketsText>
        <span>MY AVAILABLE RAFFLE TICKETS</span>
        <span>{availableTickets}</span>
      </AvailableTicketsText>
    </StyledTaskListHeader>
    )
}