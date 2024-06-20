import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/ToolListItem.scss";
import BorrowButton from "./BorrowButton.jsx";

const ToolListItem = (props) => {
  const handleClick = () => {
    props.setSelectedTool(props.toolDetails.ToolID);
  }

  return (
    <div className="card h-100">
      <div className="card-img-container d-flex justify-content-center align-items-center">
        <img className="card-img-top tool-list__image" onClick={handleClick} src={props.toolDetails.Picture} alt={props.toolDetails.Name} />
      </div>
      <div className="card-body">
        <h5 className="card-title">
          <strong>{props.toolDetails.Name}</strong>
          <small className="ml-2 text-muted"> owned by </small>
          <span className="owner-name">{props.toolDetails.OwnerName}</span>
        </h5>
        <p className="card-text mb-1">Deposit: ${props.toolDetails.Deposit}</p>
        {props.toolDetails.Charge > 0 && (
          <p className="card-text mb-1">Charge: ${props.toolDetails.Charge}</p>
        )}
        <BorrowButton toolDetails={props.toolDetails} toolId={props.toolDetails.ToolID} borrows={props.borrows} setBorrow={props.setBorrow} />
      </div>
    </div>
  );
};

export default ToolListItem;  
