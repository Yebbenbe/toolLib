// src/components/ToolList.js

import React, { useState, useEffect } from 'react';
import ToolCard from './ToolCard';
import { fetchTools } from '../services/api'; // Make sure to implement this function

const ToolList = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetchTools().then(setTools);
  }, []);

  return (
    <div>
      {tools.map(tool => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}

export default ToolList;
