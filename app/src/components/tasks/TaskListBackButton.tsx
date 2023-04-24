import styled from "styled-components";

const BackButton = styled.button`
  display: flex;
  align-items: center;
  padding-top: 9px;
  padding-left: 10px;
  background-color: transparent;

  :hover {
    border: none;
  }

  :focus {
    outline: none;
  }
`

const GooglyEye = styled.img`
  content: url('/googly-eye.png');
  max-width: 25px;
  margin: auto 5px;
`

const BackButtonText = styled.text`
  letter-spacing: 0.15em;
  font-weight: bold;
  color: rgb(255, 255, 255);
  padding-top: 5.5px;
`

type TaskListBackButtonProps = {
  onClick: any;
}

export default function TaskListBackButton(props: TaskListBackButtonProps) {
  const { onClick } = props;

  return (
    <BackButton onClick={onClick}>
              <GooglyEye/>
              <BackButtonText>
                BACK
              </BackButtonText>
    </BackButton>
    )
}