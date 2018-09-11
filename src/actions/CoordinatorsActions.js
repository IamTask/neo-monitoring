import firebase from 'firebase';
import {
  COORDINATORS_FETCH_SUCCESS,
  COORDINATORS_FLAGGING_NOTIFIED_SUCCESS,
  TAGGED_RESOURCES_FETCH_SUCCESS
 } from './types';

export const coordinatorsFetch = () => {
  return (dispatch) => {
    firebase.database()
    .ref(`/oozie_local_coordinators/`)
      .on('value', snapshot => {
        console.log(snapshot.val());
        dispatch({
          type: COORDINATORS_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const flagSliceAsNotified = ({ appName, sliceId, uid }) => {
  return (dispatch) => {
    const id = firebase.auth().currentUser.uid;
    //const updates = {};
    //updates[`/oozie_local_coordinators/${appName}/${sliceId}/notified`] = true;
    console.log(appName, sliceId, uid);
    const path = `/oozie_local_coordinators/${appName}/${sliceId}/usersNotified`;
    console.log(path);
    firebase.database().ref(path)
      .push(id)
      .then(() => {
        dispatch({
          type: COORDINATORS_FLAGGING_NOTIFIED_SUCCESS
        });
    });
  };
};
