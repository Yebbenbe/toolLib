import React, {useEffect, useReducer} from "react";

const useApplicationData = () => {
    const [state, dispatch] = useReducer(reducer, {
      tools: [],
      selectedPhoto: {
        "id": null,
        "location": {
          "city": null,
          "country": null
        },
        "urls": {
          "full": null,
          "regular": null
        },
        "user": {
          "id": null,
          "username": null,
          "name": null,
          "profile": null
        }
    },
      favPhotoIds: [],
      isPhotoDetailsModalOpen: false,
    });
    
    function reducer(state, action) {
      switch (action.type) {
        case ACTIONS.FAV_PHOTO_ADDED:
          return ({
            ...state,
            favPhotoIds: [...state.favPhotoIds, action.photoId]
          });
        case ACTIONS.FAV_PHOTO_REMOVED:
          return ({
            ...state,
            favPhotoIds: state.favPhotoIds.filter(id => id !== action.photoId)
          });
        case ACTIONS.SET_TOOL_DATA:
            return ({ ...state, 
              tools: action.toolData, 
            });
        case ACTIONS.SELECT_PHOTO:
          return ({
            ...state,
            selectedPhoto: state.tools.find(tool => tool.toolid === action.toolid),
            isPhotoDetailsModalOpen: true
          });
        case ACTIONS.DISPLAY_PHOTO_DETAILS:
          return ({ ...state, isPhotoDetailsModalOpen: false });
        default:
          throw new Error(
            `Tried to reduce with unsupported action type: ${action.type}`
          );
      }
    }

    const loadToolData = async (toolData) => {
      try {
        dispatch({type: ACTIONS.SET_TOOL_DATA, toolData: toolData})
      } catch (error) {
        console.error('Failed to load tool data:', error);
      }
    };

    useEffect(() => {
      fetch('http://localhost:3001/api/tools')
     .then(res => res.json())
     .then(toolData => {loadToolData(toolData)})
    }, []);

    const onPhotoSelect = toolid => {
      if(state.tools.find(tool => tool.toolid === toolid)){
        dispatch({type: ACTIONS.SELECT_PHOTO, toolid: toolid});
      }else{
        throw new Error(
          `Photo ID does not exist: ${toolid}`
        );
      }
    };

    const updateToFavPhotoIds = photoId => {
      console.log(photoId)
      if(state.favPhotoIds.includes(photoId)){
        dispatch({type: ACTIONS.FAV_PHOTO_REMOVED, photoId: photoId});
      }else{
        dispatch({type: ACTIONS.FAV_PHOTO_ADDED, photoId: photoId});
      }
    };

    const onClosePhotoDetailsModal = () => {
      dispatch({type: ACTIONS.DISPLAY_PHOTO_DETAILS});
    };

    const onClickTopic = (topicId) => {
      fetch('http://localhost:3001/api/topics/photos/' + topicId)
     .then(res => res.json())
     .then(data => {
        try {
            dispatch({type: ACTIONS.SET_PHOTO_DATA, photoData: data})
        } catch (error) {
            console.error('Failed to load photo data:', error);
        }
      })
    }

    return {
      state,
      onPhotoSelect,
      updateToFavPhotoIds,
      onClosePhotoDetailsModal,
      onClickTopic,
    };
}

export const ACTIONS = {
  FAV_PHOTO_ADDED: 'FAV_PHOTO_ADDED',
  FAV_PHOTO_REMOVED: 'FAV_PHOTO_REMOVED',
  SET_TOOL_DATA: 'SET_TOOL_DATA',
  SELECT_PHOTO: 'SELECT_PHOTO',
  DISPLAY_PHOTO_DETAILS: 'DISPLAY_PHOTO_DETAILS'
}

export default useApplicationData;