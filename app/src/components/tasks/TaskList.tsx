import styled from "styled-components";

export const TaskListContainer = styled.div`
  height: 100%;
`

export default function TaskList() {
  return (
      <TaskListContainer>
        <h2>TaskList!</h2>
      </TaskListContainer>
  );
}