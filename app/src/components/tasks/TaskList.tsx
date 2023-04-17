import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TaskListTable from "./TaskListTable";
import TaskListBackButton from "./TaskListBackButton";
import TaskListHeader from "./TaskListHeader";
import {getNumberOfCompletedActivities} from "../../utils/activities";

const TaskListContainer = styled.div`
  background-color: rgba(255,255,255,0.3);
  border-radius: 25px;
  min-height: 480px;
  min-width: 300px;
  text-align: center;
  margin-top: 20px;
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
    activities: Activities[]
}

interface TaskListProps extends TaskListData {
    availableTickets: number;
}

export default function TaskList(props: TaskListProps) {
  const { location, availableTickets, activities } = props;
  let navigate = useNavigate();

  return (
      <TaskListContainer>
          <TaskListBackButton onClick={() => {navigate('/', { replace: true })}}/>
          <TaskListHeader
              location={location}
              activitiesCompleted={getNumberOfCompletedActivities(activities)}
              totalActivities={activities.length}
              availableTickets={availableTickets}
          />
          <TaskListTable activities={activities}/>
      </TaskListContainer>
  );
}