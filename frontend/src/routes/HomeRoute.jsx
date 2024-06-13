import React, { useCallback, useContext, useState } from 'react';

import '../styles/HomeRoute.scss';

import ToolList from 'components/ToolList';
import Navigation from 'components/NavigationBar';

const HomeRoute = (props) => {
  console.log(props.state.tools);
  console.log(props.state.tools);
  return (
    <div className="home-route">
      < Navigation onClickOption={props.onClickOption} />
      < ToolList tools={props.state.tools} setSelectedTool={props.setSelectedTool} borrows={props.state.borrowToolIds} setBorrow={props.setBorrow} />
    </div >
  );
};

export default HomeRoute;
