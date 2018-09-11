import firebase from 'firebase';
import _ from 'lodash';
import {
  TAGGED_RESOURCES_FETCH_SUCCESS,
  TAGGED_RESOURCES_ADD_SUCCESS,
  RESOURCE_TAGGING_ATTEMPT_FAILED,
  TAGGED_RESOURCES_DELETE_SUCCESS,
  TAGGED_RESOURCES_DELETE_FAILED
 } from './types';


export const taggedResourcesFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database()
    .ref(`/users/${currentUser.uid}/taggedResources/`)
      .on('value', snapshot => {
        console.log(snapshot.val());
        dispatch({
          type: TAGGED_RESOURCES_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const tagResourceForCurrentUser = (appName) => {
  console.log(appName);
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    let taggedResources = [];
    firebase.database()
    .ref(`/users/${currentUser.uid}/taggedResources/`)
      .once('value', snapshot => {
        taggedResources = _.map(snapshot.val(), (value) => {
          return value;
        });

        console.log(taggedResources);
      });

    if (taggedResources.includes(appName)) {
      dispatch({
        type: RESOURCE_TAGGING_ATTEMPT_FAILED
      });
      return;
    }
    firebase.database().ref(`/users/${currentUser.uid}/taggedResources`)
      .push(appName)
      .then(() => {
        dispatch({
          type: TAGGED_RESOURCES_ADD_SUCCESS
        });
      });
  };
};


export const deleteTagResourceForCurrentUser = (appName) => {
  console.log(appName);
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    let toDelete;
    firebase.database()
    .ref(`/users/${currentUser.uid}/taggedResources/`)
      .once('value', snapshot => {
        toDelete = _.invert(snapshot.val())[appName];
        console.log(toDelete);

        if (toDelete === undefined) {
          console.log("asd");
          dispatch({
            type: TAGGED_RESOURCES_DELETE_FAILED
          });
          return;
        }

        console.log(toDelete);
        firebase.database()
          .ref(`/users/${currentUser.uid}/taggedResources/`).child(toDelete).remove()
            .then(() => {
              dispatch({
                type: TAGGED_RESOURCES_DELETE_SUCCESS
              });
              return;
            });
      });
  };
};
