import React from "react";

import "../styles/TopicList.scss";
import TopicListItem from "./TopicListItem";

const optionList = [
  {
    id: "1",
    name: "Borrow",
  },
  {
    id: "2",
    name: "Lend",
  },
];

const TopicList = (props) => {
  const options = optionList.map((option, index) =>
    <TopicListItem key={option.id} optionDetails={option} onClickTopic={props.onClickTopic} />
  );

  return (
    <div className="top-nav-bar__topic-list">
      {options}
    </div>
  );
};

export default TopicList;
