import {
  NOTIFICATION_LIST_FETCH_SUCCESS,
  ADD_TO_NOTIFICATION_LIST_SUCCESS,
  ADD_TO_NOTIFICATION_LIST_FAILED,
  NOTIFICATION_LIST_DELETE_SUCCESS,
  NOTIFICATION_LIST_DELETE_FAILED
} from '../actions/types.js';

const INITIAL_STATE = {};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_NOTIFICATION_LIST_SUCCESS:
      return state;
    case ADD_TO_NOTIFICATION_LIST_FAILED:
      return state;
    case NOTIFICATION_LIST_FETCH_SUCCESS:
      return action.payload;
    case NOTIFICATION_LIST_DELETE_FAILED:
      return state;
    case NOTIFICATION_LIST_DELETE_SUCCESS:
      return state;
    default:
      return state;
    }
};
