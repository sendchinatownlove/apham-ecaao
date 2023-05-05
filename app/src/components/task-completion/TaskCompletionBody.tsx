import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import CompletionModal from "../tasks/CompletionModal";
import { TaskInfo } from "../tasks/TaskList";

import TaskChecklistItem from "./TaskChecklistItem";
import TaskUpload from "./TaskUpload";

import { FirebaseService } from "../../Api";
import {BaseButton} from "../theme";

import exifr from 'exifr'

const TaskCompletionWrapper = styled.div`
    min-width: 350px;
    width: 100%;
    text-align: left;
    background: rgba(255, 255, 255, 0.3);
`;
const TaskCompletionContainer = styled.div`
    background-color: #fff1f1;
    height: 110vh;
`;
const UploadWrapper = styled.div`
    padding: 0 10px 10px 10px;
    text-align: center;
`;
const UploadButton = styled(BaseButton)<{ isDisabled: boolean }>`
    background: ${(props) => (props.isDisabled ? "#8B8B8B" : "#343434")};
    border-radius: 50px;
    width: 95%;
    margin: 0 auto;
    text-align: center;
    padding: 15px 0;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: white;
    font-weight: 700;
`;

const ErrorMessage = styled.p`
    color: #DD678A;
`

type TaskCompletionProps = {
    userId: string;
    taskId: string;
    borough: string;
    taskHeader: string;
    taskDescription: string;
    setSelectedTask: React.Dispatch<React.SetStateAction<TaskInfo | null>>;
    taskIndex: number;
};
import * as EXIF from "exif-js";
import piexif from "piexifjs";

export default function TaskCompletion(props: TaskCompletionProps) {
    const { userId, taskId, borough, taskHeader, taskDescription, setSelectedTask, taskIndex } = props;
    const [imageFileSrc, setImageFileSrc] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorHasOccurred, setErrorHasOccurred] = useState(false);
    const [isPopupActive, setIsPopupActive] = useState(false);
    const [hasImageBeenUploaded, setHasImageBeenUploaded] = useState<boolean>(false);

    const firebaseService = new FirebaseService();

    const alphanumericRegex = (str: string) => {
        return str.replace(/[^a-zA-Z0-9]/g, "-");
    };

    const API_ROUTE = "https://us-central1-scl-scavengerhunt.cloudfunctions.net/generateV4UploadSignedUrl";



    const submitImage = async () => {
        // set this to disable the button
        setHasImageBeenUploaded(false);
      
        // try {
          setIsLoading(true);
          const ext = image?.type.split("/")[1];
          const contentType = image?.type;
      
          // Read the image file as a Data URL
          const reader = new FileReader();
          reader.onload = async () => {
            const dataUrl = reader.result as string;
      
            // Create an Image element with the Data URL as its source
            const img = new Image();
            img.src = dataUrl;
            img.onload = async function () {
              // Get the EXIF data from the image
              const exifBytes = piexif.load(dataUrl);
      
              // Create a canvas and draw the image
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              ctx?.drawImage(img, 0, 0);
      
              // Convert the canvas back to a Data URL with the preserved EXIF data
              const preservedDataURL = piexif.insert(piexif.dump(exifBytes), canvas.toDataURL(contentType));
              const response = await fetch(preservedDataURL);
              const preservedImage = await response.blob();
      
              // Generate the filename
              const currentDateWithoutSec = new Date().toLocaleString("sv").split(":", 2).join(":");
              const fileName = `${userId}-${taskId}-${alphanumericRegex(currentDateWithoutSec)}.${ext}`;
      
              // Request the signed URL
              const signedUrl = await (
                await axios.post(API_ROUTE, { filename: fileName, filetype: contentType })
              ).data.url;
      
              if (!signedUrl) {
                setErrorHasOccurred(true);
                throw new Error("Empty signed URL");
              }
              debugger
              // Upload the preservedImage to the signed URL
              let result = await axios.put(signedUrl, preservedImage, {
                headers: {
                  "Content-Type": contentType,
                  'x-goog-content-length-range': '0,104857600'
                },
              }).catch((error) => {
                console.error(error);
                debugger
              });
      
              setErrorHasOccurred(false);
              setIsPopupActive(true);
              setIsLoading(false);
      
              firebaseService.completeTask(userId, taskId, borough);
            };
          };
          reader.onerror = (error) => {
            console.error(error);
            setErrorHasOccurred(true);
            setHasImageBeenUploaded(true);
          };
          reader.readAsDataURL(image as File);
        // } catch (error) {
        //   console.error(error);
        //   setErrorHasOccurred(true);
        //   setHasImageBeenUploaded(true);
        // }
      };
    useEffect(() => {
        const cancelButton = document.getElementById('cancel-button');
        cancelButton?.scrollIntoView({ behavior: 'auto' });
    });

    useEffect(() => {
        if (imageFileSrc !== "") {
            setHasImageBeenUploaded(true);
        }
    }, [imageFileSrc]);

    return (
        <TaskCompletionWrapper>
            <TaskCompletionContainer>
                <TaskChecklistItem
                    taskHeader={taskHeader}
                    taskDescription={taskDescription}
                    taskIndex={taskIndex}
                    isChecked={imageFileSrc !== ""}
                />
                <UploadWrapper>
                    <TaskUpload imageFileSrc={imageFileSrc} setImageFileSrc={setImageFileSrc} setImage={setImage} />
                    {errorHasOccurred &&
                        <ErrorMessage>{' Sorry! We had trouble uploading that image. Try again?'}</ErrorMessage>}
                    <UploadButton
                        disabled={!hasImageBeenUploaded}
                        isDisabled={!hasImageBeenUploaded}
                        // TODO: navigate back to task list page eventually
                        onClick={() => {
                            submitImage();
                        }}
                    >
                        {isLoading ? 'Loading...' : 'Upload Picture'}
                    </UploadButton>
                </UploadWrapper>
                <CompletionModal isActive={isPopupActive} setIsActive={setIsPopupActive} setSelectedTask={setSelectedTask} />
            </TaskCompletionContainer>
        </TaskCompletionWrapper>
    );
}
