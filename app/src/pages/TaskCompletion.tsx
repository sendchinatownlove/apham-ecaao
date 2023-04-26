import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import CompletionModal from "../components/tasks/CompletionModal";

import TaskChecklistItem from "../components/task-completion/TaskChecklistItem";
import TaskUpload from "../components/task-completion/TaskUpload";
import CancelButton from "../components/header-buttons/cancelButton";

const TaskCompletionWrapper = styled.div`
  border-radius: 25px;
  text-align: left;
  background: rgba(255, 255, 255, 0.3);
  width: 98vw;
  height: auto;
  max-width: 1200px;
  margin-top: 30px;
`

const TaskCompletionContainer = styled.div`
  background-color: #fff1f1;
  border-radius: 0 0 25px 25px;
  height: 100vh;
`

const HeaderWrapper = styled.div`
  padding: 10px 17px;
  border-bottom: 1px solid #A8192E;
`

const HeaderText = styled.h1`
  font-size: 14px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #A8192E;
`

const HeaderDescription = styled.p`
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #A8192E;
`

const UploadWrapper = styled.div`
  padding: 0 10px 10px 10px;
`

const UploadButton = styled.button<{ isDisabled: boolean }>`
  background: ${props => props.isDisabled ? "#8B8B8B" : "#343434"};
  border-radius: 50px;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: white;
  font-weight: 700;
  font-size: 14px;
  line-height: 19.07px;
  padding: 0.6em 1.2em;
`

type TaskCompletionProps = {
  location: string;
  taskHeader: string;
  taskDescription: string;
}

export default function TaskCompletion(props: TaskCompletionProps) {
  const { location, taskHeader, taskDescription } = props;
  let navigate = useNavigate();
  const [imageFile, setImageFile] = useState('');
  const [isPopupActive, setIsPopupActive] = useState(false);
  const hasImageBeenUploaded = imageFile !== '';

  return (
    <TaskCompletionWrapper>
      {/* TODO: change to cancel buttom component for styling consistancy */}
      <CancelButton onClick={() => {navigate(-1)}}/>
      <TaskCompletionContainer>
        <HeaderWrapper>
          <HeaderText>{location}</HeaderText>
          <HeaderDescription>Upload a photo of the completed activity</HeaderDescription>
        </HeaderWrapper>
        <TaskChecklistItem taskHeader={taskHeader} taskDescription={taskDescription} isChecked={imageFile !== ''} />
        <UploadWrapper>
          <TaskUpload imageFileSrc={imageFile} setImageFile={setImageFile} />
          <UploadButton
            disabled={!hasImageBeenUploaded}
            isDisabled={!hasImageBeenUploaded}
            // TODO: navigate back to task list page eventually
            onClick={() => {setIsPopupActive(true)}}>
            upload picture
          </UploadButton>
        </UploadWrapper>

        <CompletionModal isActive={isPopupActive} setIsActive={setIsPopupActive}/>
      </TaskCompletionContainer>
    </TaskCompletionWrapper>
  );
}