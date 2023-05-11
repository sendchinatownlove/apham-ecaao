import styled from "styled-components";

const FileInputWrapper = styled.div`
  margin-top: 30px;
  min-height: 280px;
`

const FileInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
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
  margin: 10px auto;
`

const UserUploadedImg = styled.img`
  width: 100%;
  max-height: 200px;
  border: 1px solid #DD678A;
  border-radius: 6px;
  object-fit: cover;
`

const ReplaceFileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`

const ReplaceFileInputLabel = styled.label``

const ReplaceTag = styled.div`
  position: absolute;
  bottom: 14px;
  right: 10px;
  padding: 4px 12px;
  background: #DD678A;
  border-radius: 25px;
  color: white;
  font-weight: 700;
  font-size: 14px;
`

type TaskUploadProps = {
  imageFileSrc: any;
  setImage: React.Dispatch<React.SetStateAction<any>>;
  setImageFileSrc: React.Dispatch<React.SetStateAction<any>>;
  setInvalidImageMessage: React.Dispatch<React.SetStateAction<any>>;
}

export default function TaskUpload(props: TaskUploadProps) {
  const { imageFileSrc, setImage, setImageFileSrc, setInvalidImageMessage } = props;

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
      if (!allowedTypes.includes(event.target.files[0].type)) {
        setInvalidImageMessage('Please upload a valid image file!')
        return;
      };
      if (event.target.files[0].size > 10000000 ) {
        setInvalidImageMessage('File is too large! Please upload a smaller image.')
        return;
      };
      setImage(event.target.files[0]);
      setImageFileSrc(URL.createObjectURL(event.target.files[0]));
      setInvalidImageMessage('');
    }
  };

  return (
    <>
      <FileInputWrapper>
        {imageFileSrc === "" ? (
          <>
            <FileInput type="file" id="file" onChange={onImageChange} accept="image/*, .heic" />
            <FileInputLabel htmlFor="file">
              <UploadIcon />
              Tap to upload a picture of your completed activity
            </FileInputLabel>

          </>
        ) :
          <div>
            <ReplaceFileInput type="file" id="file" onChange={onImageChange} accept="image/*, .heic" />
            <ReplaceFileInputLabel htmlFor="file">
              <div style={{ position: 'relative' }}><UserUploadedImg alt="preview image" src={imageFileSrc} />
                <ReplaceTag>Tap to replace</ReplaceTag>
              </div>
            </ReplaceFileInputLabel>
          </div>}
      </FileInputWrapper>
    </>
  )
}