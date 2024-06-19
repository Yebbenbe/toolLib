import React from "react";

import "../styles/ToolListItem.scss";
import BorrowButton from "./BorrowButton.jsx";

const ToolListItem = (props) => {
  const handleClick = () => {
    props.setSelectedTool(props.toolDetails.toolid);
  }

  return (
    <div className="tool-list__item" >
      <img className="tool-list__image" onClick={handleClick} src={props.toolDetails.Picture} />
      <div className="tool-list__user-details">
        <div className="tool-list__user-name">{props.toolDetails.Name}</div>
        <div className="tool-list__user-money">Charge ${props.toolDetails.Charge}, Deposit ${props.toolDetails.Deposit}</div>
        <BorrowButton toolId={props.toolDetails.ToolID} borrows={props.borrows} setBorrow={props.setBorrow} />
      </div>

    </div>

  )
};

export default ToolListItem;
