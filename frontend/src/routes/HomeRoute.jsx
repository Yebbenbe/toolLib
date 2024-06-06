import React, { useCallback, useContext, useState } from 'react';

import '../styles/HomeRoute.scss';

import ToolList from 'components/ToolList';
import TopNavigation from 'components/TopNavigationBar';

const HomeRoute = (props) => {
  console.log(props.state.tools);
  console.log(props.state.photos);
  return (
    <div className="home-route">
      < TopNavigation onClickTopic={props.onClickTopic} />
      < ToolList tools={props.state.tools} setSelectedPhoto={props.setSelectedPhoto} favourites={props.state.favPhotoIds} setFavourite={props.setFavourite} />
    </div >
  );
};

export default HomeRoute;
