import React, { useCallback, useContext, useEffect, useState } from 'react';

import BorrowIcon from './BorrowIcon';
import '../styles/BorrowButton.scss';

function BorrowButton(props) {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    console.log(props.toolId);
    if (props.toolId < 0) {
      return;
    }
    props.setBorrow(props.toolId);
  }

  useEffect(() => {
    if (props.borrows != undefined) {
      if (props.borrows.indexOf(props.toolId) >= 0) {
        console.log("get true")
        setSelected(true);
      } else {
        setSelected(false);
      }
    }
  }, [props.borrows]);
  return (
    <div className="tool-list__borrow-icon" onClick={handleClick}>
      <div className="tool-list__borrow-icon-button">
        <BorrowIcon selected={selected} />
      </div>
    </div>
  );
}

export default BorrowButton;