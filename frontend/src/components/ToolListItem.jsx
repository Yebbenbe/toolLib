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
      <div className="d-flex justify-content-center align-items-center" style={{height: '200px'}}>
        <img className="card-img-top tool-list__image" onClick={handleClick} src={props.toolDetails.Picture} alt={props.toolDetails.Name} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.toolDetails.Name}</h5>
        <p className="card-text"> Deposit: ${props.toolDetails.Deposit}</p>
        <BorrowButton toolDetails={props.toolDetails} toolId={props.toolDetails.ToolID} borrows={props.borrows} setBorrow={props.setBorrow} />
      </div>
    </div>
  )
};
export default ToolListItem;  
