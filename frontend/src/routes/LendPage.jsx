// frontend/src/App.jsx
import React, { useState } from 'react';

import '../styles/BorrowPage.scss';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import BorrowHome from 'routes/BorrowHome';
import ToolDetailsModal from 'routes/ToolDetailsModal';
import useApplicationData from 'hooks/useApplicationData';

const LendPage = () => {
    const {
        state,
        onToolSelect,
        updateToBorrowToolIds,
        onCloseToolDetailsModal,
        onClickOption,
    } = useApplicationData();

    return (
        < div className="LendPage" >
            <p>test lend</p>
            < BorrowHome state={state} onClickOption={onClickOption} setSelectedTool={onToolSelect} setBorrow={updateToBorrowToolIds} />
            < ToolDetailsModal onCloseToolDetailsModal={onCloseToolDetailsModal} setSelectedTool={onToolSelect} state={state} setBorrow={updateToBorrowToolIds} />
        </div >
    )
}

export default LendPage
