import firebase from 'firebase';
import _ from 'lodash';
import {
  ADD_TO_NOTIFICATION_LIST_SUCCESS,
  ADD_TO_NOTIFICATION_LIST_FAILED,
  NOTIFICATION_LIST_FETCH_SUCCESS,
  NOTIFICATION_LIST_DELETE_SUCCESS,
  NOTIFICATION_LIST_DELETE_FAILED
} from './types';


export const notificationListFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database()
    .ref(`/users/${currentUser.uid}/notificationList/`)
      .on('value', snapshot => {
        console.log(snapshot.val());
        dispatch({
          type: NOTIFICATION_LIST_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const addToNotificationList = (appName) => {
  console.log(appName);
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    let notificationList = [];
    firebase.database()
    .ref(`/users/${currentUser.uid}/notificationList`)
      .once('value', snapshot => {
        notificationList = _.map(snapshot.val(), (value) => {
          return value;
        });

        console.log(notificationList);
      });

    if (notificationList.includes(appName)) {
      dispatch({
        type: ADD_TO_NOTIFICATION_LIST_FAILED
      });
      return;
    }
    firebase.database().ref(`/users/${currentUser.uid}/notificationList`)
      .push(appName)
      .then(() => {
        dispatch({
          type: ADD_TO_NOTIFICATION_LIST_SUCCESS
        });
      });
  };
};

export const deleteFromNotificationList = (appName) => {
  console.log(appName);
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    let toDelete;
    firebase.database()
    .ref(`/users/${currentUser.uid}/notificationList/`)
      .once('value', snapshot => {
        toDelete = _.invert(snapshot.val())[appName];
        console.log(toDelete);

        if (toDelete === undefined) {
          console.log("asd");
          dispatch({
            type: NOTIFICATION_LIST_DELETE_FAILED
          });
          return;
        }

        console.log(toDelete);
        firebase.database()
          .ref(`/users/${currentUser.uid}/notificationList/`).child(toDelete).remove()
            .then(() => {
              dispatch({
                type: NOTIFICATION_LIST_DELETE_SUCCESS
              });
              return;
            });
      });
  };
};
