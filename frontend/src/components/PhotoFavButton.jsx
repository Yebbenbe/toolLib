import React, { useCallback, useContext, useEffect, useState } from 'react';

import FavIcon from './FavIcon';
import '../styles/PhotoFavButton.scss';

function PhotoFavButton(props) {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    if (props.photoId < 0) {
      return;
    }
    props.setFavourite(props.photoId);
  }

  useEffect(() => {
    if (props.favourites != undefined) {
      if (props.favourites.indexOf(props.photoId) >= 0) {
        console.log("get true")
        setSelected(true);
      } else {
        setSelected(false);
      }
    }
  }, [props.favourites]);
  return (
    <div className="photo-list__fav-icon" onClick={handleClick}>
      <div className="photo-list__fav-icon-svg">
        <FavIcon selected={selected} />
      </div>
    </div>
  );
}

export default PhotoFavButton;