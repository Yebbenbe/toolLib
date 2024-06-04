// frontend/src/App.jsx
import React, { useState } from 'react';

import './App.scss';
import HomeRoute from 'routes/HomeRoute';
import PhotoDetailsModal from 'routes/PhotoDetailsModal';
import useApplicationData from 'hooks/useApplicationData';

const App = () => {
  const {
    state,
    onPhotoSelect,
    updateToFavPhotoIds,
    onClosePhotoDetailsModal,
    onClickTopic,
  } = useApplicationData();

  return (
    < div className="App" >
      < HomeRoute state={state} onClickTopic={onClickTopic} setSelectedPhoto={onPhotoSelect} setFavourite={updateToFavPhotoIds} />
      < PhotoDetailsModal photos={state.photos} onClosePhotoDetailsModal={onClosePhotoDetailsModal} setSelectedPhoto={onPhotoSelect} state={state} setFavourite={updateToFavPhotoIds} />
    </div >
  )
}

export default App
