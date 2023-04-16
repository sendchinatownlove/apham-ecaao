import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import CompletionModal from "../components/tasks/CompletionModal";

import TaskChecklistItem from "../components/task-completion/TaskChecklistItem";
import TaskUpload from "../components/task-completion/TaskUpload";

export const TaskCompletionWrapper = styled.div`
  border-radius: 25px;
  min-height: 480px;
  max-width: 350px;
  text-align: left;
  background: rgba(255, 255, 255, 0.3);
`

export const TaskCompletionContainer = styled.div`
  background-color: #FFF1F1;
  border-radius: 0 0 25px 25px;
`

export const HeaderWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid #A8192E;
`

export const HeaderText = styled.h1`
  font-size: 14px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #A8192E;
`

export const HeaderDescription = styled.p`
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #A8192E;
`

export const SubmitButton = styled.button<{ isDisabled: boolean }>`
  background: ${props => props.isDisabled ? "#8B8B8B" : "#343434"};
  border-radius: 50px;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: white;
  font-weight: 700;
`

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-left: 10px;
  background: transparent;
  letter-spacing: 0.15em;
  text-transform: uppercase;

  :hover{
    border:none;
  }

  :focus {
    outline:none;
  }
`

export const ClosedEye = styled.img`
  content: url("/closed-eye.png");
  max-width: 20px;
  margin: 5px auto;
`

export type TaskCompletionProps = {
  location: string;
  taskHeader: string;
  taskDescription: string;
}

export default function TaskCompletion(props: TaskCompletionProps) {
  const { location, taskHeader, taskDescription } = props;
  let navigate = useNavigate();
  const [imageFile, setImageFile] = useState('');

  return (
    <TaskCompletionWrapper>
      <CancelButton onClick={() => { navigate('/', { replace: true }) }}><ClosedEye />Cancel</CancelButton>
      <TaskCompletionContainer>
        <HeaderWrapper>
          <HeaderText>{location}</HeaderText>
          <HeaderDescription>Upload a photo of the completed activity</HeaderDescription>
        </HeaderWrapper>
        <TaskChecklistItem taskHeader={taskHeader} taskDescription={taskDescription} isChecked={imageFile !== ''} />
        <TaskUpload imageFileSrc={imageFile} setImageFile={setImageFile} />
        <SubmitButton disabled={imageFile === ''} isDisabled={imageFile === ''} onClick={() => { navigate(`/tasks/${location}`, { replace: true }) }}>upload picture</SubmitButton>

        {/* TODO: add modal */}
        {/* <CompletionModal/> */}
      </TaskCompletionContainer>

    </TaskCompletionWrapper>
  );
}