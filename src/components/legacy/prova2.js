const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNewTripNotification = functions.database.ref('/oozie_local_coordinators/{id}')
  .onCreate( event => {
      const uuid = event.params.uid;

      var ref = admin.database().ref(`Users/${uuid}/token`);
      return ref.once("value", (snapshot) => {
        const payload = {
            notification: {
              title: 'You have been invited to a trip.',
              body: 'Tap here to check it out!'
            }
        };

        admin.messaging().sendToDevice(snapshot.val(), payload)

      },(errorObject) => {
          console.log("The read failed: " + errorObject.code);
      });
});

/*
return functions.database.ref('/users').once('value')
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      var expoToken = childSnapshot.val().expoToken;
      if(expoToken) {
        messages.push({
          "to": expoToken,
          "body": "PALLA"
        });
      }
    });
    return Promise.all(messages);
  }).then(messages => {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.strinfify(messages)
    })
    return null;
  });
  */

  /*
  const promises = messages.map((mess) => {
    return fetch('https://exp.host/--/api/v2/push/send', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.strinfify(messages)
    });
  });
  */
