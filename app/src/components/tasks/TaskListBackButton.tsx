import styled from "styled-components";

const BackButton = styled.button`
  display:flex;
  align-items:center;
  max-width: 110px;
  padding-top: 15px;
  padding-left: 10px;
  background-color: transparent;

  :hover{
    border:none;
  }

  :focus {
    outline:none;
  }
`

const GooglyEye = styled.img`
  content: url("/googly-eye.png");
  max-width: 30%;
  margin: 1px auto;
`

const BackButtonText = styled.text`
  font-weight: 700;
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