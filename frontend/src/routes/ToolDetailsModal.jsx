import React from 'react';
import '../styles/ToolDetailsModal.scss';
import closeSymbol from '../assets/closeSymbol.svg';

const ToolDetailsModal = (props) => {
  const { selectedTool, isToolDetailsModalOpen } = props.state;

  console.log(selectedTool);

  if (!selectedTool) {
    return <div className="tool-details-modal">No tool selected</div>;
  } else {
    return (
      <div className="tool-details-modal" hidden={!isToolDetailsModalOpen}>
        <div className='tool-details-modal__top-bar'>
          <button className="tool-details-modal__close-button" onClick={props.onCloseToolDetailsModal} >
            <img src={closeSymbol} alt="close symbol" />
          </button>
        </div>

        <div className="tool-details-modal__header">
          <img className="tool-details-modal__image" src={selectedTool.Picture} alt="Tool" />
          <div className="tool-details-modal__tool-details">
            <div className="tool-details-modal__tool-name" >{selectedTool.Name}</div>
            <div className="tool-details-modal__tool-money">Charge ${selectedTool.Charge}, Deposit ${selectedTool.Deposit}</div>
            {selectedTool.DI4U !== undefined && (
              <div className="tool-details-modal__tool-DI4U">
                Do It 4 You (DI4U): {selectedTool.DI4U.toString()}
              </div>
            )}
            <div className="tool-details-modal__tool-description">{selectedTool.Description}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default ToolDetailsModal;
