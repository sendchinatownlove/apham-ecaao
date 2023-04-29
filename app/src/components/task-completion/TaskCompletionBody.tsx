import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import CompletionModal from "../tasks/CompletionModal";
import { TaskInfo } from "../tasks/TaskList";

import TaskChecklistItem from "./TaskChecklistItem";
import TaskUpload from "./TaskUpload";

import { FirebaseService } from "../../Api";

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
const UploadButton = styled.button<{ isDisabled: boolean }>`
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

export default function TaskCompletion(props: TaskCompletionProps) {
    const { userId, taskId, borough, taskHeader, taskDescription, setSelectedTask, taskIndex } = props;
    const [imageFileSrc, setImageFileSrc] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorHasOccurred, setErrorHasOccurred] = useState(false);
    const [isPopupActive, setIsPopupActive] = useState(false);
    const hasImageBeenUploaded = imageFileSrc !== "";

    const firebaseService = new FirebaseService();

    const alphanumericRegex = (str: string) => {
        return str.replace(/[^a-zA-Z0-9]/g, "-");
    };

    const API_ROUTE = "https://us-central1-scl-scavengerhunt.cloudfunctions.net/generateV4UploadSignedUrl";

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

        try {
            setIsLoading(true);
            const ext = image?.type.split("/")[1];
            const contentType = image?.type;

            // https://stackoverflow.com/questions/17415579/how-to-iso-8601-format-a-date-with-timezone-offset-in-javascript
            const currentDateWithoutSec = new Date().toLocaleString( 'sv' ).split(":", 2).join(":");
            const fileName = `${userId}-${taskId}-${alphanumericRegex(currentDateWithoutSec)}.${ext}`;

            const signedUrl = await (
                await axios.post(API_ROUTE, { filename: fileName, filetype: contentType })
            ).data.url;

            if (!signedUrl) {
                setErrorHasOccurred(true);
                throw new Error("Empty signed URL");
            }

            let result = await axios.put(signedUrl, image, {
                headers: {
                    "Content-Type": contentType,
                },
            });
            setErrorHasOccurred(false);
            setIsPopupActive(true);
            setIsLoading(false);

            firebaseService.completeTask(userId, taskId, borough);

        } catch (error) {
            console.error(error);
            setErrorHasOccurred(true);
        }
    };

    useEffect(() => {
        const cancelButton = document.getElementById('cancel-button');
        cancelButton?.scrollIntoView({ behavior: 'auto' });
    })

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
