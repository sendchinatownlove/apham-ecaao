import styled from "styled-components";

const BackButton = styled.button`
  display:flex;
  align-items: center;
  padding-top: 15px;
  background-color: transparent;
  margin-top: 30px;

  :hover{
    border:none;
  }

  :focus {
    outline:none;
  }
`

const ClosedEye = styled.img`
  content: url("/closed-eye.png");
  width: 23px;
  margin-right: 11px;
`

const BackButtonText = styled.text`
  font-weight: 700;
`

type CancelButtonProps = {
    onClick: any;
}

export default function CancelButton(props: CancelButtonProps) {
    const { onClick } = props;

    return (
      <BackButton onClick={onClick}>
        <ClosedEye/>
        <BackButtonText>
          Cancel
        </BackButtonText>
      </BackButton>
    )
}