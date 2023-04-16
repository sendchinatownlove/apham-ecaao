
import React, { PropsWithChildren, useEffect, useState } from 'react';
import Footer from './footer';
import Header from './header';

interface LayoutProps {
  user?: Object;
}

function Layout(props: PropsWithChildren<LayoutProps>) {

  return (
    <div className="Layout">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;