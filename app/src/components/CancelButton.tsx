import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  max-width: 110px;
  padding-top: 15px;
  padding-left: 10px;
  background: transparent;
  color: white;
  letter-spacing: 0.15em;


  :hover{
    border:none;
  }

  :focus {
    outline:none;
  }
`
//   letter-spacing: 0.15em;

const ClosedEyeIcon = styled.img`
  content: url("/closed-eye.png");
  max-width: 20px;
  margin: auto 5px;`


const CancelButtonText = styled.span `
text-transform: uppercase;
font-weight: 700;`

type CancelButtonProps = {
    onClick: any;
}

export default function CancelButton(props: CancelButtonProps) {
    const { onClick } = props;

    return (
        <Button onClick={onClick}>
              <ClosedEyeIcon/>
              <CancelButtonText>
                Cancel
              </CancelButtonText>
          </Button>
    )
}