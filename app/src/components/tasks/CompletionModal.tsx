import styled from "styled-components";

import raffleImg from '../../assets/raffle.png'


export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.3); 
  width: 100%;
  height: 100%;
`

export const ModalWrapper = styled.div`
  position: absolute;
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
`

export const RaffleImage = styled.img`
  width: 193px;
`

export const ModalHeader  = styled.p`
  text-transform: uppercase;
  font-weight: 700;
`

export const BaseButton = styled.button`
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 700;
  border-radius: 40px;
`

export const PrimaryButton = styled(BaseButton)`
  background: #A8192E;
  color: white;
`

export const SecondaryButton = styled(BaseButton)`
  color: #A8192E;
  background: none;
`

export default function CompletionModal() {
  return (
    <Overlay>
    <ModalWrapper>
      <RaffleImage src={raffleImg}></RaffleImage>
      <ModalHeader>You’ve earned a raffle ticket</ModalHeader>
      <p>Nice work! Way to show up for the Chinatown communities.</p>
      <p>You can use this ticket towards a chosen giveaway prize of your choice.</p>
      <PrimaryButton>Enter my raffle ticket</PrimaryButton>
      <SecondaryButton>Enter Later</SecondaryButton>
    </ModalWrapper>
    </Overlay>
  )
}