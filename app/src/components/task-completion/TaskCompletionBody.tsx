import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CompletionModal from "../tasks/CompletionModal";

import TaskChecklistItem from "./TaskChecklistItem";
import TaskUpload from "./TaskUpload";

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
    location: string;
    taskHeader: string;
    taskDescription: string;
};

export default function TaskCompletion(props: TaskCompletionProps) {
    const { taskHeader, taskDescription } = props;
    const [imageFileSrc, setImageFileSrc] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorHasOccurred, setErrorHasOccurred] = useState(false);
    const [isPopupActive, setIsPopupActive] = useState(false);
    const hasImageBeenUploaded = imageFileSrc !== "";
    const { id } = useParams<any>();

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
            //TODO add actual user ID and Task ID
            // If you want to format this fancier to basically ISO but without the seconds and in EDT
            const filename = `${id}-${alphanumericRegex(new Date().toLocaleDateString())}.${ext}`;

            const signedUrl = await (
                await axios.post(API_ROUTE, { filename: filename, filetype: contentType })
            ).data.url;

            if (!signedUrl) {
                throw new Error("Empty signed URL");
            }

            console.log(signedUrl);
            console.log(image);
            console.log(imageFileSrc);
            let result = await axios.put(signedUrl, image, {
                headers: {
                    "Content-Type": contentType,
                },
            });
            console.log("success?");
            console.log(result);
            {
                setErrorHasOccurred(false);
                setIsPopupActive(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            // TODO What do we do if we find an error?
            setErrorHasOccurred(true);
        }
    };

    return (
        <TaskCompletionWrapper>
            <TaskCompletionContainer>
                <TaskChecklistItem
                    taskHeader={taskHeader}
                    taskDescription={taskDescription}
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
                <CompletionModal isActive={isPopupActive} setIsActive={setIsPopupActive} />
            </TaskCompletionContainer>
        </TaskCompletionWrapper>
    );
}
