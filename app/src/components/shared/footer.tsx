import Logo from "../../assets/logo.svg";
import { BodyTextMedium } from "../theme";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
  color: rgb(255, 255, 255);
  padding-bottom: 20px;
`;

const LogoWrapper = styled.div`
  display: block;
  position: relative;

  &:before {
    content: "";
    width: 150px;
    height: 0.5px;
    background: ${(props: LayoutFooterProps) => props.background ? props.background : "#FFFFFF"};
    left: 30px;
    top: 42%;
    position: absolute;
  }

  &:after {
    content: "";
    width: 150px;
    height: 0.5px;
    background: ${(props: LayoutFooterProps) => props.background ? props.background : "#FFFFFF"};
    right: 30px;
    top: 42%;
    position: absolute;
  }
`;

type LayoutFooterProps = {
  color?: string;
  background?: string;
}

function LayoutFooter(props: LayoutFooterProps) {
  const { color, background } = props;
  return (
    <Container>
      <LogoWrapper background={background}>
        <img alt="logo" src={Logo} />
      </LogoWrapper>
      <BodyTextMedium color={color} size={"12px"} bold>
        READ ABOUT THIS EVENT
      </BodyTextMedium>
      <BodyTextMedium color={color} size={"12px"} bold>
        @SENDCHINATOWNLOVE
      </BodyTextMedium>
    </Container>
  );
}

export default LayoutFooter;