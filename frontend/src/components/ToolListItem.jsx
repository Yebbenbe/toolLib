import React from "react";

import "../styles/ToolListItem.scss";
import FavButton from "./FavButton.jsx";

const ToolListItem = (props) => {
  const handleClick = () => {
    props.setSelectedPhoto(props.toolDetails.toolid);
  }

  return (
    <div className="photo-list__item" >
      <FavButton photoId={props.toolDetails.toolid} favourites={props.favourites} setFavourite={props.setFavourite} />
      <img className="photo-list__image" onClick={handleClick} src={props.toolDetails.picture} />
      <div className="photo-list__user-details">
        <div className="photo-list__user-location">{props.toolDetails.name}</div>
        <div className="photo-list__user-info">{props.toolDetails.charge}</div>
        <div className="photo-list__user-info">{props.toolDetails.deposit}</div>
      </div>

    </div>

  )
};

export default ToolListItem;
