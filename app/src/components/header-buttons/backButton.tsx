import styled from "styled-components";
import {BaseButton} from "../theme";

const StyledBackButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  padding-top: 9px;
  padding-left: 10px;
  background-color: transparent;

  &:hover {
    background-color: transparent;
  }
`

const GooglyEye = styled.img`
  content: url('/googly-eye.png');
  max-width: 50px;
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
}

export default function BackButton(props: TaskListBackButtonProps) {
  const { onClick } = props;

  return (
    <StyledBackButton onClick={onClick} >
              <GooglyEye/>
              <BackButtonText>
                BACK
              </BackButtonText>
    </StyledBackButton>
    )
}