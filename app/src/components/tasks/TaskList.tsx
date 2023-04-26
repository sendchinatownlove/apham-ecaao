import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BackButton from "../header-buttons/backButton";
import CancelButton from "../header-buttons/cancelButton";

import TaskCompletionHeader from "../task-completion/TaskCompletionHeader";
import TaskCompletionBody from "../task-completion/TaskCompletionBody";
import TaskListTable from "./TaskListTable";
import TaskListHeader from "./TaskListHeader";
import {getNumberOfCompletedActivities} from "../../utils/activities";

const TaskListContainer = styled.div`
  border-radius: 25px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.3);
  width: 98vw;
  height: auto;
  max-width: 1200px;
  margin-top: 30px;
`;

export type Activities = {
    activity: ActivityInfo
}

export type ActivityInfo = {
    title: string;
    description: string;
    completed: boolean;
    index: number;
    id: string;
}

export type TaskListData = {
  location: string;
  activities: Activities[];
}

interface TaskListProps extends TaskListData {
  availableTickets: number;
}

export default function TaskList(props: TaskListProps) {
  const { location, availableTickets, activities } = props;
  const [selectedTask, setSelectedTask] = React.useState<ActivityInfo | null>(null);

  let navigate = useNavigate();

  const onTaskClick = (task: ActivityInfo) => setSelectedTask(task);

  return (
    <TaskListContainer>
      {
        selectedTask?.title && selectedTask?.description ? (
          <>
            <CancelButton onClick={() => setSelectedTask(null)} />
            <TaskCompletionHeader location={location} />
            <TaskCompletionBody
              location={location}
              taskHeader={selectedTask.title}
              taskDescription={selectedTask.description}
            />
          </>
        ) : (
          <>
            <CancelButton onClick={() => {navigate('/', { replace: true })}}/>
            <TaskListHeader
                location={location}
                activitiesCompleted={getNumberOfCompletedActivities(activities)}
                totalActivities={activities.length - 1}
                availableTickets={availableTickets}
            />
            <TaskListTable activities={activities} onTaskClick={onTaskClick}/>
          </>
        )
      }
    </TaskListContainer>
  );
}