import React, { useCallback, useContext, useState } from 'react';

import '../styles/HomeRoute.scss';

import PhotoList from 'components/PhotoList';
import TopNavigation from 'components/TopNavigationBar';

const HomeRoute = (props) => {
  console.log(props.state.tools);
  console.log(props.state.photos);
  return (
    <div className="home-route">
      < TopNavigation onClickTopic={props.onClickTopic} />
      < PhotoList tools={props.state.tools} setSelectedPhoto={props.setSelectedPhoto} favourites={props.state.favPhotoIds} setFavourite={props.setFavourite} />
    </div >
  );
};

export default HomeRoute;
