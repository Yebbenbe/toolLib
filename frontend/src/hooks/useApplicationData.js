import React, {useEffect, useReducer} from "react";

const useApplicationData = () => {
    const [state, dispatch] = useReducer(reducer, {
      tools: [],
      selectedTool: {
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
      favToolIds: [],
      isToolDetailsModalOpen: false,
    });
    
    function reducer(state, action) {
      switch (action.type) {
        case ACTIONS.FAV_PHOTO_ADDED:
          return ({
            ...state,
            favToolIds: [...state.favToolIds, action.toolId]
          });
        case ACTIONS.FAV_PHOTO_REMOVED:
          return ({
            ...state,
            favToolIds: state.favToolIds.filter(id => id !== action.toolId)
          });
        case ACTIONS.SET_TOOL_DATA:
            return ({ ...state, 
              tools: action.toolData, 
            });
        case ACTIONS.SELECT_PHOTO:
          return ({
            ...state,
            selectedTool: state.tools.find(tool => tool.toolid === action.toolid),
            isToolDetailsModalOpen: true
          });
        case ACTIONS.DISPLAY_PHOTO_DETAILS:
          return ({ ...state, isToolDetailsModalOpen: false });
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

    const onToolSelect = toolid => {
      if(state.tools.find(tool => tool.toolid === toolid)){
        dispatch({type: ACTIONS.SELECT_PHOTO, toolid: toolid});
      }else{
        throw new Error(
          `Tool ID does not exist: ${toolid}`
        );
      }
    };

    const updateToFavToolIds = toolId => {
      console.log(toolId)
      if(state.favToolIds.includes(toolId)){
        dispatch({type: ACTIONS.FAV_PHOTO_REMOVED, toolId: toolId});
      }else{
        dispatch({type: ACTIONS.FAV_PHOTO_ADDED, toolId: toolId});
      }
    };

    const onCloseToolDetailsModal = () => {
      dispatch({type: ACTIONS.DISPLAY_PHOTO_DETAILS});
    };

    const onClickTopic = (topicId) => {
      fetch('http://localhost:3001/api/topics/tools/' + topicId)
     .then(res => res.json())
     .then(data => {
        try {
            dispatch({type: ACTIONS.SET_PHOTO_DATA, toolData: data})
        } catch (error) {
            console.error('Failed to load tool data:', error);
        }
      })
    }

    return {
      state,
      onToolSelect,
      updateToFavToolIds,
      onCloseToolDetailsModal,
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