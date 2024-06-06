import React, { useCallback, useContext, useState } from 'react';

import '../styles/NavigationBar.scss'
import TopicList from './TopicList';
import FavBadge from './FavBadge';

const Navigation = (props) => {
  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">ToolsLib</span>
      < TopicList onClickTopic={props.onClickTopic} />
    </div>
  )
}

export default Navigation;