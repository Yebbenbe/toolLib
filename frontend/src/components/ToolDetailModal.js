// src/components/ToolDetailModal.js

import React from 'react';

const ToolDetailModal = ({ tool, onClose }) => {
  return (
    <div className="modal">
      <span onClick={onClose}>Close</span>
      <h2>{tool.name}</h2>
      <img src={tool.image} alt={tool.name} />
      <p>{tool.description}</p>
      <button onClick={() => console.log('Request to Borrow')}>Borrow</button>
    </div>
  );
}

export default ToolDetailModal;
