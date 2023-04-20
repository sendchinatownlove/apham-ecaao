import React, { PropsWithChildren } from 'react';
import Footer from './footer';
import Header from './header';
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px 19px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 36px;
  gap: 21px;
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