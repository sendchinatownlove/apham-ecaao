import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const Icon = styled.img`
  content: url("/header.png");
  min-width: 89px;
  min-height: 64px;
  width: 20%;
`;

function LayoutHeader() {

  return (
    <Container>
      <Icon /> 
    </Container>
  );
}

export default LayoutHeader;