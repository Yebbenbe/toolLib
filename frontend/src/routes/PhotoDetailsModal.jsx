import React, { useContext, useMemo } from 'react';

import '../styles/PhotoDetailsModal.scss'
import closeSymbol from '../assets/closeSymbol.svg';
import photos from 'mocks/photos';
import FavButton from 'components/FavButton';
import FavBadge from 'components/FavBadge';
import ToolList from 'components/ToolList';

//Initialize value to avoid render fail in the similar photos
let similarPhotosList = [{
  "id": "1",
  "location": {
    "city": "Montreal",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-1-Full.jpeg`,
    "regular": `${process.env.PUBLIC_URL}/Image-1-Regular.jpeg`
  },
  "user": {
    "id": "1",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}];

const PhotoDetailsModal = (props) => {
  useMemo(() => {
    if (props.state.selectedPhoto != undefined) {
      if (props.state.selectedPhoto.id > 0) {
        similarPhotosList = [];
        for (const index in props.state.selectedPhoto.similar_photos) {
          similarPhotosList.push(props.state.selectedPhoto.similar_photos[index]);
        }
      }
    }
  }, [props.state.selectedPhoto]);

  return (
    <div className="photo-details-modal" hidden={!props.state.isPhotoDetailsModalOpen}>
      <div className='photo-details-modal__top-bar'>
        <button className="photo-details-modal__close-button" onClick={props.onClosePhotoDetailsModal} >
          <img src={closeSymbol} alt="close symbol" />
        </button>
      </div>

      <div className="photo-details-modal__header">
        {/* <FavButton photoId={props.state.selectedPhoto.id} favourites={props.state.favourites} setFavourite={props.setFavourite} /> */}
        <img className="photo-details-modal__image" src={props.state.selectedPhoto.picture} />
        <div className="photo-details-modal__photographer-details">
          <div className="photo-details-modal__photographer-profile" >{props.state.selectedPhoto.name}</div>
          <div className="photo-details-modal__photographer-location">{props.state.selectedPhoto.charge}, {props.state.selectedPhoto.deposit}</div>
          <div className="photo-details-modal__photographer-info">{props.state.selectedPhoto.description}</div>
        </div>
        {/* <div>Similar Photos</div>
        <div className='photo-details-modal__top-bar'>
          <ToolList photos={similarPhotosList} favourites={props.favourites} setFavourite={props.setFavourite} />
        </div> */}
      </div>
    </div>
  )
};

export default PhotoDetailsModal;
