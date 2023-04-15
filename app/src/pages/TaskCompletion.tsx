import styled from "styled-components";
import { useState } from 'react';
import dummyTask from '../components/tasks/dummyTask.json'

import CompletionModal from "../components/tasks/CompletionModal";

export const TaskCompletionWrapper = styled.div`
  text-align: left;
  margin: 0 100px;
`

export const ChecklistItem = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 12px;
  color: #343434;
`

export const HeaderText = styled.h1`
  font-size: 14px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #A8192E;
`

export const HeaderDescription = styled.p`
  font-size: 14px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #A8192E;
`

export const TaskHeader = styled.p`
  margin-top: 0;
`
export const TaskDescription = styled.p``


export const Checkbox = styled.input`

`

export const FileInputLabel = styled.label`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 142px;
  cursor: pointer;
  color: #A8192E;
  background: rgba(221, 103, 138, 0.2);
  border: 1px solid #DD678A;
  border-radius: 6px;
  text-align: center;
`

export const FileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`

export const SubmitButton = styled.button`
  // TODO: if no image, show disabled button color: #8B8B8B;
  background: #343434;
  border-radius: 50px;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: white;
  font-weight: 700;
`

export default function TaskCompletion() {

  const [imageFile, setImageFile] = useState('');

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <TaskCompletionWrapper>
      {/* TODO: add cancel button */}
      <div className='header'>
        <HeaderText>Manhattan</HeaderText>
        <HeaderDescription>Upload a photo of the completed activity</HeaderDescription>
      </div>
      <ChecklistItem>
        <div>
          <TaskHeader>{dummyTask.header}</TaskHeader>
          <TaskDescription>{dummyTask.description}</TaskDescription>
        </div>
        <div>
          {/* TODO: Checkbox should check automatically when image is uploaded, 
          user tapping on the box will not cause any action  */}
          <Checkbox type="checkbox" className='checkbox' />
        </div>
      </ChecklistItem>

      {imageFile === "" ? (<div className="file-input">
        <FileInput type="file" id="file" onChange={onImageChange} accept="image/*" />
        <FileInputLabel htmlFor="file">Tap to upload a picture of your completed task</FileInputLabel>
      </div>) :
        <img alt="preview image" src={imageFile} />}
      <SubmitButton>upload picture</SubmitButton>

      {/* TODO: add modal */}
      <CompletionModal/>

    </TaskCompletionWrapper>
  );
}