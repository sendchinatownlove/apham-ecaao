import React, { PropsWithChildren } from 'react';
import Footer from './footer';
import Header from './header';
import styled from "styled-components";

const LayoutContainer = styled.div`
  border-radius: 25px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.3);
  width: 98vw;
  height: 110vh;
  max-width: 1200px;
  margin-top: 30px;
`;

interface LayoutProps {
  user?: Object;
}

function Layout(props: PropsWithChildren<LayoutProps>) {
  return (
    <LayoutContainer>
      <Header />
      {props.children}
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;