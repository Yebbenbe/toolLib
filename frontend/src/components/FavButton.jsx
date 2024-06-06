import React, { useCallback, useContext, useEffect, useState } from 'react';

import FavIcon from './FavIcon';
import '../styles/FavButton.scss';

function FavButton(props) {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    if (props.toolId < 0) {
      return;
    }
    props.setFavourite(props.toolId);
  }

  useEffect(() => {
    if (props.favourites != undefined) {
      if (props.favourites.indexOf(props.toolId) >= 0) {
        console.log("get true")
        setSelected(true);
      } else {
        setSelected(false);
      }
    }
  }, [props.favourites]);
  return (
    <div className="tool-list__fav-icon" onClick={handleClick}>
      <div className="tool-list__fav-icon-svg">
        <FavIcon selected={selected} />
      </div>
    </div>
  );
}

export default FavButton;