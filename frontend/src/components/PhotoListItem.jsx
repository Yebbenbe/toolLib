import React from "react";

import "../styles/PhotoListItem.scss";
import PhotoFavButton from "../components/PhotoFavButton.jsx";

const PhotoListItem = (props) => {
  const handleClick = () => {
    props.setSelectedPhoto(props.photoDetails.id);
  }

  return (
    <div className="photo-list__item" >
      <PhotoFavButton photoId={props.photoDetails.id} favourites={props.favourites} setFavourite={props.setFavourite} />
      <img className="photo-list__image" onClick={handleClick} src={props.photoDetails.urls.regular} />
      <div className="photo-list__user-details">
        <img className="photo-list__user-profile" src={props.photoDetails.user.profile} />
        <div className="photo-list__user-location">{props.photoDetails.location.city}, {props.photoDetails.location.country}</div>
        <div className="photo-list__user-info">{props.photoDetails.user.username}</div>
      </div>

    </div>

  )
};

export default PhotoListItem;
