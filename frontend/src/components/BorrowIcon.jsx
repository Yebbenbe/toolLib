import React from 'react';

const BorrowIcon = ({ selected, sameUser }) => {
  console.log(sameUser);
  return (
    <button
      className={`borrow-icon-button ${sameUser ? 'disabled' : ''}`}
      style={{ backgroundColor: sameUser ? "#CCCCCC" : selected ? "#04AA6D" : "#EEEEEE" }}
      disabled={sameUser}
    >
      {sameUser ? "Owned" : selected ? "Borrowed" : "Borrow"}
    </button>
  );
};

export default BorrowIcon;
