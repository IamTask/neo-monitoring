import {
  COORDINATORS_FETCH_SUCCESS,
  COORDINATORS_FLAGGING_NOTIFIED_SUCCESS,
  TAGGED_RESOURCES_FETCH_SUCCESS
 } from '../actions/types';

const INITIAL_STATE = {};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COORDINATORS_FETCH_SUCCESS:
      return action.payload;
    case COORDINATORS_FLAGGING_NOTIFIED_SUCCESS:
      console.log("COORDINATORS_FLAGGING_NOTIFIED_SUCCESS dispatched");
      return state;
    default:
      return state;
    }
};
