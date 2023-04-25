import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import TaskCompletion from '../../pages/TaskCompletion';

import TaskListTable from "./TaskListTable";
import BackButton from "../headerButtons/BackButton";
import CancelButton from "../headerButtons/CancelButton";
import TaskCompletionHeader from "../task-completion/TaskCompletionHeader";
import TaskListHeader from "./TaskListHeader";
import {getNumberOfCompletedActivities} from "../../utils/activities";

const TaskListContainer = styled.div`
  background-color: rgba(255,255,255,0.3);
  border-radius: 25px;
  min-height: 480px;
  min-width: 300px;
  max-width: 350px;
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
  const [selectedTask, setSelectedTask] = React.useState<ActivityInfo | null>(null);
  let navigate = useNavigate();

  const onTaskClick = (task: ActivityInfo) => setSelectedTask(task);

  return (
    <TaskListContainer>
        {selectedTask?.title && selectedTask?.description ? (
            <>
                <CancelButton onClick={() => setSelectedTask(null)} />
                <TaskCompletionHeader location={location} />
                <TaskCompletion
                    location={location}
                    taskHeader={selectedTask.title}
                    taskDescription={selectedTask.description}
                />
            </>
        ) : (
            <>
                <BackButton onClick={() => {navigate('/', { replace: true })}}/>
                <TaskListHeader
                    location={location}
                    activitiesCompleted={getNumberOfCompletedActivities(activities)}
                    totalActivities={activities.length}
                    availableTickets={availableTickets}
                />
                <TaskListTable activities={activities} onTaskClick={onTaskClick}/>
            </>
        )}
    </TaskListContainer>
  );
}