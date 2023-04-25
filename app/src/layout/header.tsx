
import React from 'react';
import HeaderIcon from "../assets/header.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;

  img {
    max-width: 20%;
  }
`;

function LayoutHeader() {

  return (
    <Container>
      <img src={HeaderIcon} />
    </Container>
  );
}

export default LayoutHeader;