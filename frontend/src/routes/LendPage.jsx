// frontend/src/App.jsx
import React, { useState } from 'react';

import '../styles/LendPage.scss';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import BorrowHome from 'routes/BorrowHome';
import ToolDetailsModal from 'routes/ToolDetailsModal';
import useApplicationData from 'hooks/useApplicationData';
import LendHome from './LendHome';

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
            < LendHome state={state} onClickOption={onClickOption} setSelectedTool={onToolSelect} setBorrow={updateToBorrowToolIds} />
        </div >
    )
}

export default LendPage
