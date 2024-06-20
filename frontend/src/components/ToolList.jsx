import React, { useEffect } from "react";
import "../styles/ToolList.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import ToolListItem from "./ToolListItem";

const ToolList = (props) => {
  // Ensure tools is an array
  console.log(props.tools.tools);
  const tools = Array.isArray(props.tools.tools) ? props.tools.tools : [];

  return (
    <div className="container mt-4">
      <div className="row">
        {tools.length > 0 ? (
          tools.map((tool) => (
            <div className="col-md-4 mb-4" key={tool.ToolID}>
              <ToolListItem
                toolDetails={tool}
                setSelectedTool={props.setSelectedTool}
                borrows={props.borrows}
                setBorrow={props.setBorrow}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No tools available</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ToolList;
