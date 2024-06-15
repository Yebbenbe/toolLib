// frontend/src/App.jsx
import React, { useState } from 'react';

import '../styles/BorrowPage.scss';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomeRoute from 'routes/HomeRoute';
import ToolDetailsModal from 'routes/ToolDetailsModal';
import useApplicationData from 'hooks/useApplicationData';

const BorrowPage = () => {
    const {
        state,
        onToolSelect,
        updateToBorrowToolIds,
        onCloseToolDetailsModal,
        onClickOption,
    } = useApplicationData();

    return (
        < div className="BorrowPage" >
            < HomeRoute state={state} onClickOption={onClickOption} setSelectedTool={onToolSelect} setBorrow={updateToBorrowToolIds} />
            < ToolDetailsModal onCloseToolDetailsModal={onCloseToolDetailsModal} setSelectedTool={onToolSelect} state={state} setBorrow={updateToBorrowToolIds} />
        </div >
    )
}

export default BorrowPage
