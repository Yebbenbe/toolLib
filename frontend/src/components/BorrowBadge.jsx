import React from 'react';
import BorrowIcon from './BorrowIcon';

import '../styles/BorrowBadge.scss';

const BorrowBadge = ({ isFavToolExist }) => {
  return (
    <div className='borrow-badge'>
      <BorrowIcon selected={true} displayAlert={!!isFavToolExist} />
    </div>
  )
};

export default BorrowBadge;