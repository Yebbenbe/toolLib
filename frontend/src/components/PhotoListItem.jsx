import React from "react";

import "../styles/PhotoListItem.scss";
import PhotoFavButton from "../components/PhotoFavButton.jsx";

const PhotoListItem = (props) => {
  const handleClick = () => {
    props.setSelectedPhoto(props.toolDetails.toolid);
  }

  return (
    <div className="photo-list__item" >
      <PhotoFavButton photoId={props.toolDetails.toolid} favourites={props.favourites} setFavourite={props.setFavourite} />
      <img className="photo-list__image" onClick={handleClick} src={props.toolDetails.picture} />
      <div className="photo-list__user-details">
        <div className="photo-list__user-location">{props.toolDetails.name}</div>
        <div className="photo-list__user-info">{props.toolDetails.charge}</div>
        <div className="photo-list__user-info">{props.toolDetails.deposit}</div>
      </div>

    </div>

  )
};

export default PhotoListItem;
