import React, { useEffect } from "react";

import "../styles/PhotoList.scss";
import PhotoListItem from "./PhotoListItem";

const PhotoList = (props) => {
  let tools;
  if (props.tools != undefined) {
    tools = props.tools.map((tool, index) =>
      <PhotoListItem key={tool.toolid} toolDetails={tool} setSelectedPhoto={props.setSelectedPhoto} favourites={props.favourites} setFavourite={props.setFavourite} />
    );
  }
  const photos = props.photos.map((photo, index) =>
    <PhotoListItem key={photo.id} photoDetails={photo} setSelectedPhoto={props.setSelectedPhoto} favourites={props.favourites} setFavourite={props.setFavourite} />
  );

  return (
    <ul className="photo-list">
      {tools}
    </ul>
  );
};

export default PhotoList;
