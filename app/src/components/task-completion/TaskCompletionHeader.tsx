import styled from "styled-components";
const HeaderWrapper = styled.div`
  padding: 10px 17px ;
  border-bottom: 1px solid #A8192E;
  background: #FFF1F1;
  text-align: left;
  display: flex;
  flex-direction: column;
`
const HeaderText = styled.h1`
  font-size: 14px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #A8192E;
`
const HeaderDescription = styled.p`
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #A8192E;
`
type TaskCompletionHeaderProps = {
  borough: string;
}

export default function TaskCompletionHeader(props: TaskCompletionHeaderProps) {
  const { borough} = props;

  return (
    <HeaderWrapper>
      <HeaderText>{borough}</HeaderText>
      <HeaderDescription>Upload a photo of the completed activity</HeaderDescription>
    </HeaderWrapper>
  );
}
