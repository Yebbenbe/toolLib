import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/OptionListItem.scss";

const OptionListItem = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const routes = ["/", "/borrow", "/lend"];
    navigate(routes[props.optionDetails.id]);
  }

  return (
    <div className="option-list__item" onClick={handleClick}>
      <span>{props.optionDetails.name}</span>
    </div>
  );
};

export default OptionListItem;
