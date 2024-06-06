import React from "react";

import "../styles/OptionList.scss";
import OptionListItem from "./OptionListItem";

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

const OptionList = (props) => {
  const options = optionList.map((option, index) =>
    <OptionListItem key={option.id} optionDetails={option} onClickOption={props.onClickOption} />
  );

  return (
    <div className="top-nav-bar__option-list">
      {options}
    </div>
  );
};

export default OptionList;
