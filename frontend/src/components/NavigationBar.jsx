import React, { useCallback, useContext, useState } from 'react';

import '../styles/NavigationBar.scss'
import OptionList from './OptionList';
import BorrowBadge from './BorrowBadge';

const Navigation = (props) => {
  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">ToolsLib</span>
      < OptionList onClickOption={props.onClickOption} />
    </div>
  )
}

export default Navigation;