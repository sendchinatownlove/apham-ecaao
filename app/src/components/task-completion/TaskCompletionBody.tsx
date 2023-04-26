import styled from "styled-components";
import { useState } from 'react';
import CompletionModal from "../tasks/CompletionModal";

import TaskChecklistItem from "./TaskChecklistItem";
import TaskUpload from "./TaskUpload";

const TaskCompletionWrapper = styled.div`
  min-width: 350px;
  width: 100%;
  text-align: left;
  background: rgba(255, 255, 255, 0.3);
`
const TaskCompletionContainer = styled.div`
  background-color: #FFF1F1;
  height: 110vh;
`
const UploadWrapper = styled.div`
  padding: 0 10px 10px 10px;
  text-align: center;
`
const UploadButton = styled.button<{ isDisabled: boolean }>`
  background: ${props => props.isDisabled ? "#8B8B8B" : "#343434"};
  border-radius: 50px;
  width: 95%;
  margin: 0 auto;
  text-align: center;
  padding: 15px 0;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: white;
  font-weight: 700;
`

type TaskCompletionProps = {
  location: string;
  taskHeader: string;
  taskDescription: string;
}

export default function TaskCompletion(props: TaskCompletionProps) {
  const { taskHeader, taskDescription } = props;
  const [imageFile, setImageFile] = useState('');
  const [isPopupActive, setIsPopupActive] = useState(false);
  const hasImageBeenUploaded = imageFile !== '';

  return (
    <TaskCompletionWrapper>
      <TaskCompletionContainer>
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