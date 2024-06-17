import React from 'react';
import '../styles/NavigationBar.scss';
import OptionList from './OptionList';
import BorrowBadge from './BorrowBadge';

const Navigation = (props) => {
  const { auth, onClickOption } = props;

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">ToolsLib</span>
      {auth && auth.username ? (
        <span className="top-nav-bar__username">Welcome, {auth.username}</span>
      ) : (
        <span className="top-nav-bar__username">Welcome, Guest</span>
      )}
      <OptionList onClickOption={onClickOption} />
    </div>
  );
};

export default Navigation;
