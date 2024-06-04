import React, { useContext, useMemo } from 'react';

import '../styles/PhotoDetailsModal.scss'
import closeSymbol from '../assets/closeSymbol.svg';
import photos from 'mocks/photos';
import PhotoFavButton from 'components/PhotoFavButton';
import FavBadge from 'components/FavBadge';
import PhotoList from 'components/PhotoList';

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
        <PhotoFavButton photoId={props.state.selectedPhoto.id} favourites={props.state.favourites} setFavourite={props.setFavourite} />
        <img className="photo-details-modal__image" src={props.state.selectedPhoto.urls.full} />
        <div className="photo-details-modal__photographer-details">
          <img className="photo-details-modal__photographer-profile" src={props.state.selectedPhoto.user.profile} />
          <div className="photo-details-modal__photographer-location">{props.state.selectedPhoto.location.city}, {props.state.selectedPhoto.location.country}</div>
          <div className="photo-details-modal__photographer-info">{props.state.selectedPhoto.user.username}</div>
        </div>
        <div>Similar Photos</div>
        <div className='photo-details-modal__top-bar'>
          <PhotoList photos={similarPhotosList} favourites={props.favourites} setFavourite={props.setFavourite} />
        </div>
      </div>
    </div>
  )
};

export default PhotoDetailsModal;
