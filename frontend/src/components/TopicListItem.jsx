import React from "react";

import "../styles/TopicListItem.scss";

const TopicListItem = (props) => {
  const handleClick = () => {
    props.onClickTopic(props.topicDetails.id)
  }

  return (
    <div className="topic-list__item" onClick={handleClick}>
      <span>{props.topicDetails.title}</span>
    </div>
  );
};

export default TopicListItem;
