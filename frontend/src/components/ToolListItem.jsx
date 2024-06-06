import React from "react";

import "../styles/ToolListItem.scss";
import FavButton from "./FavButton.jsx";

const ToolListItem = (props) => {
  const handleClick = () => {
    props.setSelectedTool(props.toolDetails.toolid);
  }

  return (
    <div className="tool-list__item" >
      <FavButton toolId={props.toolDetails.toolid} favourites={props.favourites} setFavourite={props.setFavourite} />
      <img className="tool-list__image" onClick={handleClick} src={props.toolDetails.picture} />
      <div className="tool-list__user-details">
        <div className="tool-list__user-name">{props.toolDetails.name}</div>
        <div className="tool-list__user-money">{props.toolDetails.charge}, {props.toolDetails.deposit}</div>
      </div>

    </div>

  )
};

export default ToolListItem;
