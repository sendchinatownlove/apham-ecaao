import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  min-height: 65px;
  padding-top: 9px;
  padding-left: 10px;
  background-color: transparent;
  text-transform: uppercase;
  letter-spacing: 0.15em;

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
  width: 23px;
  margin-right: 11px;
`

const ButtonText = styled.text`
  font-weight: 700;
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
          Cancel
        </ButtonText>
      </Button>
    )
}