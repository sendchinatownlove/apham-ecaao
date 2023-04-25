import styled from "styled-components";

const Button = styled.button`
  display:flex;
  align-items:center;
  margin-top: 30px;
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

export default function BackButton(props: TaskListBackButtonProps) {
    const { onClick } = props;

    return (
        <Button onClick={onClick}>
            <GooglyEye/>
            <BackButtonText>
              BACK
            </BackButtonText>
        </Button>
    )
}