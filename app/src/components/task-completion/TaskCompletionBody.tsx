import axios from 'axios';
import styled from "styled-components";
import { useState } from 'react';
import { useParams } from "react-router-dom";
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
  const [imageFileSrc, setImageFileSrc] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const hasImageBeenUploaded = imageFileSrc !== '';
  const { id } = useParams<any>();

  const alphanumericRegex = (str: string) => {
    return str.replace(/[^a-zA-Z0-9]/g, '-');
  };

  const API_ROUTE = 'https://us-central1-scl-scavengerhunt.cloudfunctions.net/generateV4UploadSignedUrl';

  const submitImage = async () => {
    /**
     *  1. create the filename
     * 
     *  2. post the filename to the backend
     *    - receive specific upload url
     * 
     *  3. upload the file to that signed url
     * 
     *  4. (later) update our app DB that the task is completed
     * 
     */

    const ext = image?.type.split('/')[1];
    const contentType = image?.type;
    let filename = `${id}-${alphanumericRegex(new Date().toISOString())}.${ext}`;

    const signedUrl = await (await axios.get(API_ROUTE)).data.url;

    console.log(signedUrl);
    console.log(image);
    console.log(imageFileSrc);
    let result = await axios.put(signedUrl, image, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
    console.log("success?");
    console.log(result);
    { setIsPopupActive(true) };
  }

  return (
    <TaskCompletionWrapper>
      <TaskCompletionContainer>
        <TaskChecklistItem taskHeader={taskHeader} taskDescription={taskDescription} isChecked={imageFileSrc !== ''} />
        <UploadWrapper>
          <TaskUpload imageFileSrc={imageFileSrc} setImageFileSrc={setImageFileSrc} setImage={setImage} />
          <UploadButton
            disabled={!hasImageBeenUploaded}
            isDisabled={!hasImageBeenUploaded}
            // TODO: navigate back to task list page eventually
            onClick={() => {
              submitImage();
            }}>
            upload picture
          </UploadButton>
        </UploadWrapper>
        <CompletionModal isActive={isPopupActive} setIsActive={setIsPopupActive} />
      </TaskCompletionContainer>
    </TaskCompletionWrapper>
  );
}