import {
  TAGGED_RESOURCES_FETCH_SUCCESS,
  TAGGED_RESOURCES_ADD_SUCCESS,
  RESOURCE_TAGGING_ATTEMPT_FAILED,
  TAGGED_RESOURCES_DELETE_SUCCESS
} from '../actions/types.js';

const INITIAL_STATE = {};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAGGED_RESOURCES_FETCH_SUCCESS:
      console.log(action.payload);
      return action.payload;
    case TAGGED_RESOURCES_ADD_SUCCESS:
      return state;
    case RESOURCE_TAGGING_ATTEMPT_FAILED:
      return state;
    case TAGGED_RESOURCES_DELETE_SUCCESS:
      return state;
    default:
      return state;
    }
};
