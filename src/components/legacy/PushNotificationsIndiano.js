import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';

class Notification extends Component {

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.registerForPushNotificationsAsync(currentUser);
  }

  async registerForPushNotificationsAsync(user) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    const token = await Notifications.getExpoPushTokenAsync();
    const updates = {};
    updates['/expoToken'] = token;
    firebase.database().ref('users').child(user.uid).update(updates);
  }

  render() {
    return (
      <View><Text>PROVA</Text></View>
    );
  }
}

export default Notification;
