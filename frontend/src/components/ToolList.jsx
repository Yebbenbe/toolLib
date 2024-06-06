import React, { useEffect } from "react";

import "../styles/ToolList.scss";
import ToolListItem from "./ToolListItem";

const ToolList = (props) => {
  let tools;
  if (props.tools != undefined) {
    tools = props.tools.map((tool, index) =>
      <ToolListItem key={tool.toolid} toolDetails={tool} setSelectedPhoto={props.setSelectedPhoto} favourites={props.favourites} setFavourite={props.setFavourite} />
    );
  }

  return (
    <ul className="photo-list">
      {tools}
    </ul>
  );
};

export default ToolList;
