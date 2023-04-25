import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Icon = styled.img`
  content: url("/send-chinatown-love.png");
  width: 80px;
  height: 50px;
`;

function LayoutHeader() {

  return (
    <Container>
      <Icon /> 
    </Container>
  );
}

export default LayoutHeader;