export const flagSliceAsNotified = ({ appName, sliceId, uid }) => {
  return (dispatch) => {
    const id = firebase.auth().currentUser.uid;
    //const updates = {};
    //updates[`/oozie_local_coordinators/${appName}/${sliceId}/notified`] = true;
    console.log(appName, sliceId, uid);
    const path = `/oozie_local_coordinators/${appName}/${sliceId}/notificationList`;
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
