import React, { useCallback, useContext, useState } from 'react';

import '../styles/TopNavigationBar.scss'
import TopicList from './TopicList';
import FavBadge from './FavBadge';

const TopNavigation = (props) => {
  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      < TopicList topics={props.topics} onClickTopic={props.onClickTopic} />
      < FavBadge isFavPhotoExist={props.favourites.length > 0} />
    </div>
  )
}

export default TopNavigation;