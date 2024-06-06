import React from "react";

import "../styles/OptionListItem.scss";

const OptionListItem = (props) => {
  const handleClick = () => {
    props.onClickOption(props.optionDetails.id)
  }

  return (
    <div className="option-list__item" onClick={handleClick}>
      <span>{props.optionDetails.name}</span>
    </div>
  );
};

export default OptionListItem;
