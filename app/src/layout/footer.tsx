import React from 'react';
import FooterSeparator from "../assets/footerSeparator.svg";
import { BodyTextMedium } from "../components/theme";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 21px;
`;

function LayoutFooter() {

  return (
    <Container>
      <img src={FooterSeparator} />
      <BodyTextMedium bold>
        READ ABOUT THIS EVENT
      </BodyTextMedium>
      <BodyTextMedium bold>
        @SENDCHINATOWNLOVE
      </BodyTextMedium>
    </Container>
  );
}

export default LayoutFooter;