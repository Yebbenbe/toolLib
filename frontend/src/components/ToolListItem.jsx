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
        <BorrowButton toolId={props.toolDetails.toolid} borrows={props.borrows} setBorrow={props.setBorrow} />
        <div className="tool-list__user-name">{props.toolDetails.name}</div>
        <div className="tool-list__user-money">{props.toolDetails.charge}, {props.toolDetails.deposit}</div>
      </div>

    </div>

  )
};

export default ToolListItem;
