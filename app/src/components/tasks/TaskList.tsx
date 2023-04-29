import React, {useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BackButton from "../header-buttons/backButton";
import CancelButton from "../header-buttons/cancelButton";

import TaskCompletionHeader from "../task-completion/TaskCompletionHeader";
import TaskCompletionBody from "../task-completion/TaskCompletionBody";
import TaskListTable from "./TaskListTable";
import TaskListHeader from "./TaskListHeader";
import {AirTableService, FirebaseService, Task} from "../../Api";

const TaskListContainer = styled.div`
  border-radius: 25px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.3);
  width: 98vw;
  height: auto;
  max-width: 1200px;
  margin-top: 30px;
`;

export type TaskInfo = {
    title: string;
    description: string;
    completed: boolean;
    index: number;
    id: string;
}

export type TaskListProps = {
  location: string;
  availableTickets: number;
  userId: string | undefined;
}

export default function TaskList(props: TaskListProps) {
  const { location, availableTickets, userId } = props;
  const [selectedTask, setSelectedTask] = React.useState<TaskInfo | null>(null);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const firebaseService = new FirebaseService();
  const airtableService = new AirTableService();
  const [completedTaskIds, setCompletedTaskIds] = React.useState<String[]>([]);

  useEffect(() => {
      async function getTasks() {
          setTasks(await airtableService.getTasks(location));
      }
      async function getCompletedTasks() {
        const completedTasks = await firebaseService.getTasksByBorough(userId!, location);
        setCompletedTaskIds(Object.keys(completedTasks));
        console.log(completedTaskIds);
      }

      if (userId !== undefined) {
          getTasks();
          getCompletedTasks();
      }

  }, [selectedTask]);

  let navigate = useNavigate();

  const onTaskClick = (task: TaskInfo) => setSelectedTask(task);

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
              setSelectedTask={setSelectedTask}
            />
          </>
        ) : (
          <>
            <BackButton onClick={() => {navigate('/', { replace: true })}}/>
            <TaskListHeader
                location={location}
                tasksCompleted={completedTaskIds.length}
                totalTasks={tasks.length - 1}
                availableTickets={availableTickets}
            />
            <TaskListTable onTaskClick={onTaskClick} tasks={tasks} completedTasks={completedTaskIds}/>
          </>
        )
      }
    </TaskListContainer>
  );
}
