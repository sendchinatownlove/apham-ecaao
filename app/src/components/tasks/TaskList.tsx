import styled from "styled-components";

const TaskListContainer = styled.div`
  background-color: rgba(255,255,255,0.3);
  border-radius: 25px;
  min-height: 480px;
  min-width: 300px;
  text-align: center;
  margin-top: 20px;
`

const SendChinatownLove = styled.img`
  content: url("/send-chinatown-love.png");
  max-width: 30%;
  display: block;
  margin: 1px auto;
  padding-top: 10px;
`

export default function TaskList() {
  return (
      <TaskListContainer>
          <SendChinatownLove/>
        <h2>TaskList!</h2>
      </TaskListContainer>
  );
}