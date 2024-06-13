import React from 'react';
import BurrowIcon from './BurrowIcon';

import '../styles/BorrowBadge.scss';

const BorrowBadge = ({ isFavToolExist }) => {
  return (
    <div className='borrow-badge'>
      <BurrowIcon selected={true} displayAlert={!!isFavToolExist} />
    </div>
  )
};

export default BorrowBadge;