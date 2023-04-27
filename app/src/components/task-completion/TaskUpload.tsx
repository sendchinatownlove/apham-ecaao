import styled from "styled-components";

const FileInputWrapper = styled.div`
  margin-top: 0;
  min-height: 280px;
`

const FileInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  margin: 20px 0;
  cursor: pointer;
  color: #DD678A;
  background: rgba(221, 103, 138, 0.2);
  border: 1px solid #DD678A;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
`

const FileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`

const UploadIcon = styled.img`
  content: url("/upload.png");
  max-width: 40px;
  margin: 5px auto;
`

const UserUploadedImg = styled.img`
  width: 100%;
  max-height: 200px;
  border: 1px solid #DD678A;
  border-radius: 6px;
  object-fit: cover;
`

const UploadedImgWrapper = styled.div`
  position: relative;
`

const ReplaceFileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`

const ReplaceFileInputLabel = styled.label`
  position: absolute;
  bottom: 10px;
  right: 2px;
  padding: 0 10px;
  background: #DD678A;
  border-radius: 25px;
  color: white;
  font-weight: 700;
`

type TaskUploadProps = {
  imageFileSrc: any;
  setImage: React.Dispatch<React.SetStateAction<any>>;
  setImageFileSrc: React.Dispatch<React.SetStateAction<any>>;
}

export default function TaskUpload(props: TaskUploadProps) {
  const { imageFileSrc, setImage, setImageFileSrc } = props;

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageFileSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <FileInputWrapper>
        {imageFileSrc === "" ? (
          <>
            <FileInput type="file" id="file" onChange={onImageChange} accept="image/*" />
            <FileInputLabel htmlFor="file">
              <UploadIcon />
              Tap to upload a picture of your completed task
            </FileInputLabel>
          </>
        ) :
          <UploadedImgWrapper>
            <UserUploadedImg alt="preview image" src={imageFileSrc} />
            <div>
              <ReplaceFileInput type="file" id="file" onChange={onImageChange} accept="image/*" />
              <ReplaceFileInputLabel htmlFor="file">
                Tap to replace
              </ReplaceFileInputLabel>
            </div>
          </UploadedImgWrapper>}
      </FileInputWrapper>
    </>
  )
}