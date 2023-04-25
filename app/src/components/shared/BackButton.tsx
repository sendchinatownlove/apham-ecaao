import styled from "styled-components";

const StyledBackButton = styled.button`
  display: flex;
  align-items: center;
  padding-top: 9px;
  padding-left: 10px;
  background-color: transparent;

  &:hover {
      background-color: transparent;
      border-color: transparent;
    }

  :focus {
    outline: none;
  }

  height: ${(props: TaskListBackButtonProps) => props.text === "CANCEL" && "64px" }

`

const GooglyEye = styled.img`
  content: url('/googly-eye.png');
  max-width: 50px;
`

const ClosedEye = styled.img`
  content: url("/closed-eye.png");
  max-width: 30px;
  margin: auto 10px auto 5px;
`


const BackButtonText = styled.text`
  letter-spacing: 0.15em;
  font-weight: bold;
  color: rgb(255, 255, 255);
  padding-top: 5.5px;
  padding-bottom: 10px;
`

type TaskListBackButtonProps = {
  onClick: any;
  text: string;
}

export default function BackButton(props: TaskListBackButtonProps) {
  const { onClick, text } = props;

  return (
    <StyledBackButton text={text} onClick={onClick} >
              {text === "BACK" ? <GooglyEye/> : <ClosedEye/> }
              <BackButtonText>
                {text}
              </BackButtonText>
    </StyledBackButton>
    )
}