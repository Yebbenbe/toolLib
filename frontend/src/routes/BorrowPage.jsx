import React from 'react';
import '../styles/BorrowPage.scss';
import BorrowHome from 'routes/BorrowHome';
import ToolDetailsModal from 'routes/ToolDetailsModal';
import useApplicationData from 'hooks/useApplicationData';

const BorrowPage = ({ auth }) => {
    const {
        state,
        onToolSelect,
        updateToBorrowToolIds,
        onCloseToolDetailsModal,
        onClickOption,
    } = useApplicationData();

    return (
        <div className="BorrowPage">
            <BorrowHome state={state} onClickOption={onClickOption} setSelectedTool={onToolSelect} setBorrow={updateToBorrowToolIds} />
            <ToolDetailsModal onCloseToolDetailsModal={onCloseToolDetailsModal} setSelectedTool={onToolSelect} state={state} setBorrow={updateToBorrowToolIds} />
        </div>
    );
};

export default BorrowPage;
