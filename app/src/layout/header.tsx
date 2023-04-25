
import React from 'react';
import HeaderIcon from "../assets/header.svg";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
`;

function LayoutHeader() {

  return (
    <Container>
      <img src={HeaderIcon} />
    </Container>
  );
}

export default LayoutHeader;