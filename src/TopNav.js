import React, { useState } from 'react';
import TopBar from './TopBar';
import NavDrawer from './NavDrawer';

function TopNav (props) {
  const [drawerStatus, setDrawerStatus] = useState(false);

  const toggleDrawer = (status) => () => {
    setDrawerStatus(status);
  };

  return (
    <>
      <TopBar toggleDrawer={toggleDrawer} />
      <NavDrawer toggleDrawer={toggleDrawer} drawerStatus={drawerStatus} />
    </>
  )
}

export default TopNav;