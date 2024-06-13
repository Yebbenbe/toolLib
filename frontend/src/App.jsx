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
    updateToBorrowToolIds,
    onCloseToolDetailsModal,
    onClickOption,
  } = useApplicationData();

  return (
    < div className="App" >
      < HomeRoute state={state} onClickOption={onClickOption} setSelectedTool={onToolSelect} setBorrow={updateToBorrowToolIds} />
      < ToolDetailsModal onCloseToolDetailsModal={onCloseToolDetailsModal} setSelectedTool={onToolSelect} state={state} setBorrow={updateToBorrowToolIds} />
    </div >
  )
}

export default App
