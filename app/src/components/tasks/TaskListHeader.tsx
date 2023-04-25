import styled from "styled-components";

const StyledTaskListHeader = styled.div`
  background-image: url("/task-list-header.png");
  background-size: 100% 70px;
  color: #A8192E;
  min-height: 70px;
  min-width: 100%;
  margin-top: 10px;
`

const LocationText = styled.div`
  font-weight:700;
  display:flex;
  justify-content:space-between;
  padding: 10px 10px 0px 10px;
`

const AvailableTicketsText = styled.div`
  font-weight: 300;
  font-size: 0.8em;
  display:flex;
  justify-content:space-between;
  padding: 5px 10px 10px 10px;
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