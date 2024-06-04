import React from "react";

import "../styles/TopicListItem.scss";

const TopicListItem = (props) => {
  const handleClick = () => {
    props.onClickTopic(props.optionDetails.id)
  }

  return (
    <div className="topic-list__item" onClick={handleClick}>
      <span>{props.optionDetails.name}</span>
    </div>
  );
};

export default TopicListItem;
