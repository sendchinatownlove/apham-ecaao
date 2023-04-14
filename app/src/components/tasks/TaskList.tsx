import styled from "styled-components";

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

const BackButton = styled.div`
  display:flex;
  align-items:center;
  max-width: 75px;
  padding-top: 10px;
  padding-left: 10px;
`

const BackButtonText = styled.text`
  font-weight: 700;
`

export default function TaskList() {
  return (
      <TaskListContainer>
          <BackButton>
              <GooglyEye/>
              <BackButtonText>
                BACK
              </BackButtonText>
          </BackButton>
      </TaskListContainer>
  );
}