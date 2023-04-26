import styled from "styled-components";

const Button = styled.button`
display: flex;
align-items: center;
padding-top: 9px;
padding-left: 10px;
background-color: transparent;
height: 64px;

&:hover {
    background-color: transparent;
    border-color: transparent;
  }

:focus {
  outline: none;
}
`

const ClosedEye = styled.img`
  content: url("/closed-eye.png");
  max-width: 25px;
  margin: auto 10px auto 5px;
`

const ButtonText = styled.text`
  letter-spacing: 0.15em;
  font-weight: bold;
  color: rgb(255, 255, 255);
  padding-top: 5.5px;
  padding-bottom: 10px;
`

type CancelButtonProps = {
    onClick: any;
}

export default function CancelButton(props: CancelButtonProps) {
    const { onClick } = props;

    return (
      <Button onClick={onClick}>
        <ClosedEye/>
        <ButtonText>
          CANCEL
        </ButtonText>
      </Button>
    )
}