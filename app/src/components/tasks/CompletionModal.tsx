import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import raffleImg from '../../assets/raffle.png'
import { TaskInfo } from "./TaskList";

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
  max-width: 300px;
  color: rgb(52, 52, 52);
`

const RaffleImage = styled.img`
  width: 193px;
`

const ModalHeader = styled.p`
  text-transform: uppercase;
  font-weight: 700;
`

const BaseButton = styled.button`
  width: 100%;
  height: 36px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 700;
  border-radius: 40px;
`

const PrimaryButton = styled(BaseButton)`
  background: #A8192E;
  color: white;
  margin: 20px 0;
`

const SecondaryButton = styled(BaseButton)`
  color: #A8192E;
  background: none;
`

type CompletionModalProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskInfo | null>>;
}

export default function CompletionModal(props: CompletionModalProps) {
  const { isActive, setIsActive, setSelectedTask } = props;
  let navigate = useNavigate();

  return (
    <>
      {isActive && (
        <Overlay>
          <ModalWrapper>
            <RaffleImage src={raffleImg} />
            <ModalHeader>You’ve earned a raffle ticket</ModalHeader>
            <p>Nice work! Way to show up for the Chinatown communities.</p>
            <p>You can use this ticket towards a chosen giveaway prize of your choice.</p>
            <PrimaryButton onClick={() => { navigate('/raffles') }}>Enter my raffle ticket</PrimaryButton>
            <SecondaryButton onClick={() => {
              setIsActive(false);
              setSelectedTask(null);
            }}>Enter Later</SecondaryButton>
          </ModalWrapper>
        </Overlay>
      )}
    </>

  )
}