// src/components/ToolCard.js

import React from 'react';

const ToolCard = ({ tool }) => {
  return (
    <div onClick={() => console.log('Open Tool Details')}>
      <img src={tool.image} alt={tool.name} />
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      {/* Include other details as necessary */}
    </div>
  );
}

export default ToolCard;
