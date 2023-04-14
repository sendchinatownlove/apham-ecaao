import styled from "styled-components";

export const TaskListContainer = styled.div`
  background-color: rgba(255,255,255,0.5);
  border-radius: 25px;
  min-height: 480px;
  min-width: 300px;
  text-align: center;
  margin-top: 20px;
`

export default function TaskList() {
  return (
      <TaskListContainer>
        <h2>TaskList!</h2>
      </TaskListContainer>
  );
}