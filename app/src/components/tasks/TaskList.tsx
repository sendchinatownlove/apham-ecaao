import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BackButton from "../header-buttons/backButton";
import CancelButton from "../header-buttons/cancelButton";

import TaskCompletionHeader from "../task-completion/TaskCompletionHeader";
import TaskCompletionBody from "../task-completion/TaskCompletionBody";
import TaskListTable from "./TaskListTable";
import TaskListHeader from "./TaskListHeader";
import { firebaseService } from '../../App';

const TaskListContainer = styled.div`
  border-radius: 25px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.3);
  width: 98vw;
  height: auto;
  max-width: 1200px;
  margin-top: 30px;
`;

//single activity
export type ActivityInfo = {
  id: string;
  createdTime: string;
  fields: {
    Borough: string;
    "Task Title": string;
    Index: number;
    "Task Description": string;
  }
}

//array of activities by borough
export type Activities = ActivityInfo[]

//[[manhattan],[brooklyn],[queen]]
export type TaskListData = Activities[];

interface TaskListProps {
  userId?: string | null;
  location: string;
  availableTickets: number;
  activities: Activities;
}

export default function TaskList(props: TaskListProps) {
  const { userId, location, availableTickets, activities } = props;
  const [selectedTask, setSelectedTask] = React.useState<ActivityInfo | null>(null);
  const [numberOfCompletedActivities, setNumberOfCompletedActivities] = useState<number>(0);

  let navigate = useNavigate();

  const onTaskClick = (task: ActivityInfo) => setSelectedTask(task);

  useEffect(() => {
    const getNumberOfCompletedActivities = async () => {
      const numberOfCompletedActivities = await firebaseService.getCompletedTasksByBorough(userId!, location.toLowerCase())
      setNumberOfCompletedActivities(numberOfCompletedActivities || 0);
    };
  
    getNumberOfCompletedActivities();
  }, [userId, location]);

  return (
    <TaskListContainer>
      {
        selectedTask ? (
          <>
            <CancelButton onClick={() => setSelectedTask(null)} />
            <TaskCompletionHeader location={location} />
            <TaskCompletionBody
              location={location}
              taskHeader={selectedTask.fields?.["Task Title"]}
              taskDescription={selectedTask.fields?.["Task Description"]}
              setSelectedTask={setSelectedTask}
            />
          </>
        ) : (
          <>
            <BackButton onClick={() => {navigate('/', { replace: true })}}/>
            <TaskListHeader
                location={location}
                activitiesCompleted={numberOfCompletedActivities}
                totalActivities={activities?.length - 1}
                availableTickets={availableTickets}
            />
            <TaskListTable activities={activities} onTaskClick={onTaskClick}/>
          </>
        )
      } 
    </TaskListContainer>
  );
}