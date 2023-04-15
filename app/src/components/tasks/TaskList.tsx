import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TaskListTable from "./TaskListTable";

const TaskListContainer = styled.div`
  background-color: rgba(255,255,255,0.3);
  border-radius: 25px;
  min-height: 480px;
  min-width: 300px;
  text-align: center;
  margin-top: 20px;
`

const GooglyEye = styled.img`
  content: url("/googly-eye.png");
  max-width: 30%;
  margin: 1px auto;
`

const BackButton = styled.button`
  display:flex;
  align-items:center;
  max-width: 110px;
  padding-top: 15px;
  padding-left: 10px;
  background-color: transparent;

  :hover{
    border:none;
  }

  :focus {
    outline:none;
  }
`

const BackButtonText = styled.text`
  font-weight: 700;
`

const TaskListHeader = styled.div`
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

export type Activities = {
    activity: ActivityInfo
}

export type ActivityInfo = {
    title: string;
    description: string;
    completed: boolean;
}

export type TaskListData = {
    location: string;
    totalActivities: number;
    activitiesCompleted: number;
    activities: Activities[]
}

interface TaskListProps extends TaskListData {
    availableTickets: number;
}

export default function TaskList(props: TaskListProps) {
  const { location, totalActivities, activitiesCompleted, availableTickets, activities } = props;
  let navigate = useNavigate();

  return (
      <TaskListContainer>
          <BackButton onClick={() => {navigate('/', { replace: true })}}>
              <GooglyEye/>
              <BackButtonText>
                BACK
              </BackButtonText>
          </BackButton>
          <TaskListHeader>
              <LocationText>
                  <span>{location.toUpperCase()}</span>
                  <span>{activitiesCompleted}/{totalActivities}</span>
              </LocationText>
              <AvailableTicketsText>
                  <span>MY AVAILABLE RAFFLE TICKETS</span>
                  <span>{availableTickets}</span>
              </AvailableTicketsText>
          </TaskListHeader>
          <TaskListTable activities={activities}/>
      </TaskListContainer>
  );
}