import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CoordinatorsReducer from './CoordinatorsReducer.js';
import ResourcesReducer from './ResourcesReducer';
import NotificationListReducer from './NotificationListReducer';

export default combineReducers({
  auth: AuthReducer,
  coordinators: CoordinatorsReducer,
  resources: ResourcesReducer,
  notificationList: NotificationListReducer
});
