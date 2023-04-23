import styled from "styled-components";
import { useState } from 'react';
import CompletionModal from "../components/tasks/CompletionModal";

import TaskChecklistItem from "../components/task-completion/TaskChecklistItem";
import TaskUpload from "../components/task-completion/TaskUpload";

const TaskCompletionWrapper = styled.div`
  border-radius: 25px;
  max-width: 350px;
  text-align: left;
  background: rgba(255, 255, 255, 0.3);
`
const TaskCompletionContainer = styled.div`
  background-color: #FFF1F1;
  border-radius: 0 0 25px 25px;
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