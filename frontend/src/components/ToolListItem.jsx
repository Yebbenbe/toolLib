import React from "react";

import "../styles/ToolListItem.scss";
import BorrowButton from "./BorrowButton.jsx";

const ToolListItem = (props) => {
  const handleClick = () => {
    props.setSelectedTool(props.toolDetails.toolid);
  }

  return (
    <div className="tool-list__item" >
      <img className="tool-list__image" onClick={handleClick} src={props.toolDetails.picture} />
      <div className="tool-list__user-details">
        <div className="tool-list__user-name">{props.toolDetails.name}</div>
        <div className="tool-list__user-money">Charge ${props.toolDetails.charge}, Deposit ${props.toolDetails.deposit}</div>
        <BorrowButton toolId={props.toolDetails.toolid} borrows={props.borrows} setBorrow={props.setBorrow} />
      </div>

    </div>

  )
};

export default ToolListItem;
