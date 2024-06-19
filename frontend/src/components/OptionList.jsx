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
  {
    id: "3",
    name: "Logout",
  },
];

const OptionList = (props) => {
  const options = optionList.map((option, index) =>
    <OptionListItem key={option.id} optionDetails={option} />
  );

  return (
    <div className="top-nav-bar__option-list">
      {options}
    </div>
  );
};

export default OptionList;
