const functions = require('firebase-functions');
var fetch = require('node-fetch');
const _ = require( 'lodash' );
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref('/oozie_local_coordinators/{id}')
  .onCreate((change,context) => {
      var messages = [];
      return admin.database().ref("/users").once('value')
        .then((snap) => {
          const users = snap.val();
          var usersTokens = _.map(users, (item) => {
              return item.expoToken;
          });
          console.log(usersTokens);

          const payload = {
              notification: {
                title: 'You have been invited to a trip.',
                body: 'Tap here to check it out!'
              }
          };

          messages = usersTokens.map((token) => {
            return {
              "to": token,
              "body": "note"
            };
          });

          console.log(messages);
          return Promise.all(messages);
        }).then((messages) => {
          console.log("ESEGUO");
          fetch('exp.host/--/api/v2/push/send', {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "content-type": "application/json"
            },
            body: JSON.stringify({
                to: "ExponentPushToken[w_AG-dD5M6VhShSS_nKPAi]",
                title: "asd",
                body: "asd"
            })
          });
          return Promise.resolve(null);
        }).catch(() => {
          console.log("failed");
        });
  });
/*
  admin.database().ref("/users").once('value')
    .then((snap) => {
      const users = snap.val();
      var usersTokens = _.map(users, (item) => {
          return item.expoToken;
      });
      console.log(usersTokens);

      const payload = {
          notification: {
            title: 'You have been invited to a trip.',
            body: 'Tap here to check it out!'
          }
      };

      messages = usersTokens.map((token) => {
        return {
          "to": token,
          "body": "note"
        };
      });

      console.log(messages);
      return Promise.all(messages);
    }).then((messages) => {
      console.log("ESEGUO");
      fetch('https://exp.host/--/api/v2/push/send', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({
            to: "ExponentPushToken[w_AG-dD5M6VhShSS_nKPAi]",
            title: "asd",
            body: "asd"
        })
      });
      return Promise.resolve(null);
    }).catch(() => {
      console.log("failed");
    });
*/
