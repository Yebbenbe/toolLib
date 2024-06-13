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
      borrowToolIds: [],
      isToolDetailsModalOpen: false,
    });
    
    function reducer(state, action) {
      switch (action.type) {
        case ACTIONS.BORROW_TOOL_ADDED:
          return ({
            ...state,
            borrowToolIds: [...state.borrowToolIds, action.toolId]
          });
        case ACTIONS.BORROW_TOOL_REMOVED:
          return ({
            ...state,
            borrowToolIds: state.borrowToolIds.filter(id => id !== action.toolId)
          });
        case ACTIONS.SET_TOOL_DATA:
            return ({ ...state, 
              tools: action.toolData, 
            });
        case ACTIONS.SELECT_TOOL:
          return ({
            ...state,
            selectedTool: state.tools.find(tool => tool.toolid === action.toolid),
            isToolDetailsModalOpen: true
          });
        case ACTIONS.DISPLAY_TOOL_DETAILS:
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
        dispatch({type: ACTIONS.SELECT_TOOL, toolid: toolid});
      }else{
        throw new Error(
          `Tool ID does not exist: ${toolid}`
        );
      }
    };

    const updateToBorrowToolIds = toolId => {
      console.log(toolId)
      if(state.borrowToolIds.includes(toolId)){
        dispatch({type: ACTIONS.BORROW_TOOL_REMOVED, toolId: toolId});
      }else{
        dispatch({type: ACTIONS.BORROW_TOOL_ADDED, toolId: toolId});
      }
    };

    const onCloseToolDetailsModal = () => {
      dispatch({type: ACTIONS.DISPLAY_TOOL_DETAILS});
    };

    const onClickOption = (optionId) => {
      fetch('http://localhost:3001/api/options/tools/' + optionId)
     .then(res => res.json())
     .then(data => {
        try {
            dispatch({type: ACTIONS.SET_TOOL_DATA, toolData: data})
        } catch (error) {
            console.error('Failed to load tool data:', error);
        }
      })
    }

    return {
      state,
      onToolSelect,
      updateToBorrowToolIds,
      onCloseToolDetailsModal,
      onClickOption,
    };
}

export const ACTIONS = {
  BORROW_TOOL_ADDED: 'BORROW_TOOL_ADDED',
  BORROW_TOOL_REMOVED: 'BORROW_TOOL_REMOVED',
  SET_TOOL_DATA: 'SET_TOOL_DATA',
  SELECT_TOOL: 'SELECT_TOOL',
  DISPLAY_TOOL_DETAILS: 'DISPLAY_TOOL_DETAILS'
}

export default useApplicationData;