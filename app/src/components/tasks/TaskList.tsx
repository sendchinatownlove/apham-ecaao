import React, {useEffect} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";

import BackButton from "../header-buttons/backButton";
import CancelButton from "../header-buttons/cancelButton";

import TaskCompletionHeader from "../task-completion/TaskCompletionHeader";
import TaskCompletionBody from "../task-completion/TaskCompletionBody";
import TaskListTable from "./TaskListTable";
import TaskListHeader from "./TaskListHeader";
import {AirTableService, FirebaseService, Task} from "../../Api";
import { PageContainer } from "../theme";
import GooglyEyeLoader from "../shared/GooglyEyeLoader";
import {FeatureFlags, isFeatureFlagOn} from "../../utils/featureFlags";

export type TaskInfo = {
    title: string;
    description: string;
    completed: boolean;
    index: number;
    id: string;
}

export type TaskListProps = {
  userId: string | undefined;
}

export default function TaskList(props: TaskListProps) {
  const { userId } = props;
  const borough = useParams().borough;
  const [selectedTask, setSelectedTask] = React.useState<TaskInfo | null>(null);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [availableTickets, setAvailableTickets] = React.useState<number>(0);
  const firebaseService = new FirebaseService();
  const airtableService = new AirTableService();
  const [completedTaskIds, setCompletedTaskIds] = React.useState<String[]>([]);

  const [isReady, setIsReady] = React.useState<boolean>(false);

  async function getTasks() {
      if(!tasks || tasks.length == 0) {
        setTasks(await airtableService.getTasks(borough));
      }
  }

  useEffect(() => {
      async function getCompletedTasks() {
        const completedTasks = await firebaseService.getTasksByBorough(userId!, borough!);
        setCompletedTaskIds(Object.keys(completedTasks));
      }

      async function getAvailableTickets() {
          const availableTickets = await firebaseService.getAvailableRaffleTickets(userId!);
          setAvailableTickets(availableTickets || 0);
      }

      (async () => {
        if (userId !== undefined) {
          await getTasks();
          await getCompletedTasks();
          await getAvailableTickets();
          setIsReady(true);
        }
      })();

  }, [userId, selectedTask]);

  let navigate = useNavigate();

  const onTaskClick = (task: TaskInfo) => {
      if (!isFeatureFlagOn(FeatureFlags.RAFFLE_SHUTDOWN_MAY_22)) setSelectedTask(task);
  }

  return (
      <>
          {!isReady ? (
              <GooglyEyeLoader></GooglyEyeLoader>
          ) : (
              <PageContainer>
                  {
                      selectedTask?.title &&
                      selectedTask?.description &&
                      !isFeatureFlagOn(FeatureFlags.RAFFLE_SHUTDOWN_MAY_22) ? (
                      <>
                          <CancelButton onClick={() => setSelectedTask(null)} />
                          <TaskCompletionHeader borough={borough!} />
                          <TaskCompletionBody
                              userId={userId ? userId : "0"}
                              taskId={selectedTask.id}
                              taskIndex={selectedTask.index}
                              borough={borough!}
                              taskHeader={selectedTask.title}
                              taskDescription={selectedTask.description}
                              setSelectedTask={setSelectedTask}
                          />
                      </>
                  ) : (
                      <>
                          <BackButton
                              onClick={() => {
                                  navigate("/", { replace: true });
                              }}
                          />
                          <TaskListHeader
                              borough={borough!}
                              tasksCompleted={completedTaskIds.length}
                              totalTasks={tasks.length - 1}
                              availableTickets={availableTickets}
                          />
                          <TaskListTable onTaskClick={onTaskClick} tasks={tasks} completedTasks={completedTaskIds} />
                      </>
                  )}
              </PageContainer>
          )}
      </>
  );
}
