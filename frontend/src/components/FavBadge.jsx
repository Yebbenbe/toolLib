import React from 'react';
import FavIcon from './FavIcon';

import '../styles/FavBadge.scss';

const FavBadge = ({ isFavToolExist }) => {
  return (
    <div className='fav-badge'>
      <FavIcon selected={true} displayAlert={!!isFavToolExist} />
    </div>
  )
};

export default FavBadge;