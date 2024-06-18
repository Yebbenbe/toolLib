import React, { useEffect } from "react";
import "../styles/ToolList.scss";
import ToolListItem from "./ToolListItem";

const ToolList = (props) => {
  // Ensure tools is an array
  console.log(props.tools.tools)
  const tools = Array.isArray(props.tools.tools) ? props.tools.tools : [];

  return (
    <ul className="tool-list">
      {tools.length > 0 ? (
        tools.map((tool) => (
          <ToolListItem
            key={tool.ToolID} // Assuming ToolID is the correct key
            toolDetails={tool}
            setSelectedTool={props.setSelectedTool}
            borrows={props.borrows}
            setBorrow={props.setBorrow}
          />
        ))
      ) : (
        <li>No tools available</li> // You can customize this message as needed
      )}
    </ul>
  );
};

export default ToolList;
