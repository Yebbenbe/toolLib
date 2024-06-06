// frontend/src/App.jsx
import React, { useState } from 'react';

import './App.scss';
import HomeRoute from 'routes/HomeRoute';
import ToolDetailsModal from 'routes/ToolDetailsModal';
import useApplicationData from 'hooks/useApplicationData';

const App = () => {
  const {
    state,
    onToolSelect,
    updateToFavToolIds,
    onCloseToolDetailsModal,
    onClickTopic,
  } = useApplicationData();

  return (
    < div className="App" >
      < HomeRoute state={state} onClickTopic={onClickTopic} setSelectedTool={onToolSelect} setFavourite={updateToFavToolIds} />
      < ToolDetailsModal onCloseToolDetailsModal={onCloseToolDetailsModal} setSelectedTool={onToolSelect} state={state} setFavourite={updateToFavToolIds} />
    </div >
  )
}

export default App
