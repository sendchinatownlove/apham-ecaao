import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import confirmationImg from '../../assets/confirmation.png'

const Overlay = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
`

const ModalWrapper = styled.div`
  margin: auto;
  background: white;
  top: 0;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 13px;
  font-size: 14px;
  padding: 20px;
  margin-top 100px;
  max-width: 300px;
`

const EntryConfirmationImage = styled.img`
  width: 193px;
`

const ModalHeader = styled.p`
  text-transform: uppercase;
  font-weight: 700;
`

const CloseButton = styled.button`
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 700;
  border-radius: 40px;
  color: #A8192E;
  background: none;
`

type ConfirmationModalProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EntryConfirmationModal(props: ConfirmationModalProps) {
  const { isActive, setIsActive } = props;
  let navigate = useNavigate();

  return (
    <>
      {/* {isActive && ( */}
        <Overlay>
          <ModalWrapper>
            <EntryConfirmationImage src={confirmationImg} />
            <ModalHeader>Submission Confirmed</ModalHeader>
            <p>Congratulations!</p>
            <p>You've successfully submitted one (1) entry to this giveaway prize.</p>
            {/* TODO: navigate to raffle page */}
            <CloseButton onClick={() => { setIsActive(false) }}>Close</CloseButton>
          </ModalWrapper>
        </Overlay>
      {/* )} */}
    </>

  )
}