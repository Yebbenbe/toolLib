import React, { useCallback, useContext, useState } from 'react';

import '../styles/HomeRoute.scss';

import PhotoList from 'components/PhotoList';
import TopNavigation from 'components/TopNavigationBar';

const HomeRoute = (props) => {
  console.log(props.state.tools);
  return (
    <div className="home-route">
      < TopNavigation topics={props.state.topics} onClickTopic={props.onClickTopic} favourites={props.state.favPhotoIds} />
      < PhotoList photos={props.state.photos} setSelectedPhoto={props.setSelectedPhoto} favourites={props.state.favPhotoIds} setFavourite={props.setFavourite} />
    </div >
  );
};

export default HomeRoute;
