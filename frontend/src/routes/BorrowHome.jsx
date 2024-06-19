import React from 'react';
import '../styles/BorrowHome.scss';
import ToolList from 'components/ToolList';
import Navigation from 'components/NavigationBar';

const BorrowHome = (props) => {
  return (
    <div className="borrow-home">
      <Navigation />
      <ToolList
        tools={props.state.tools}
        setSelectedTool={props.setSelectedTool}
        borrows={props.state.borrowToolIds}
        setBorrow={props.setBorrow}
      />
    </div>
  );
};

export default BorrowHome;
