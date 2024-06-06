import React, { useContext, useMemo } from 'react';

import '../styles/ToolDetailsModal.scss'
import closeSymbol from '../assets/closeSymbol.svg';
import tools from 'mocks/tools';
import FavButton from 'components/FavButton';
import FavBadge from 'components/FavBadge';
import ToolList from 'components/ToolList';

//Initialize value to avoid render fail in the similar tools
let similarToolsList = [{
  "id": "1",
  "location": {
    "city": "Montreal",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-1-Full.jpeg`,
    "regular": `${process.env.PUBLIC_URL}/Image-1-Regular.jpeg`
  },
  "user": {
    "id": "1",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}];

const ToolDetailsModal = (props) => {
  useMemo(() => {
    if (props.state.selectedTool != undefined) {
      if (props.state.selectedTool.id > 0) {
        similarToolsList = [];
        for (const index in props.state.selectedTool.similar_tools) {
          similarToolsList.push(props.state.selectedTool.similar_tools[index]);
        }
      }
    }
  }, [props.state.selectedTool]);

  return (
    <div className="tool-details-modal" hidden={!props.state.isToolDetailsModalOpen}>
      <div className='tool-details-modal__top-bar'>
        <button className="tool-details-modal__close-button" onClick={props.onCloseToolDetailsModal} >
          <img src={closeSymbol} alt="close symbol" />
        </button>
      </div>

      <div className="tool-details-modal__header">
        {/* <FavButton toolId={props.state.selectedTool.id} favourites={props.state.favourites} setFavourite={props.setFavourite} /> */}
        <img className="tool-details-modal__image" src={props.state.selectedTool.picture} />
        <div className="tool-details-modal__toolgrapher-details">
          <div className="tool-details-modal__toolgrapher-profile" >{props.state.selectedTool.name}</div>
          <div className="tool-details-modal__toolgrapher-location">{props.state.selectedTool.charge}, {props.state.selectedTool.deposit}</div>
          <div className="tool-details-modal__toolgrapher-info">{props.state.selectedTool.description}</div>
        </div>
        {/* <div>Similar Tools</div>
        <div className='tool-details-modal__top-bar'>
          <ToolList tools={similarToolsList} favourites={props.favourites} setFavourite={props.setFavourite} />
        </div> */}
      </div>
    </div>
  )
};

export default ToolDetailsModal;
