import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Constants, Notifications, Permissions } from 'expo';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import Square from './Square';

import {
  coordinatorsFetch,
  flagSliceAsNotified,
  notificationListFetch
} from '../actions/';


const label1 = 'Charts';
const label2 = 'Tagged Resources';
const label3 = 'Coordinators Status';
const label4 = 'Notifications List';

class Beginning extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("asd");
    console.log(nextProps.coordinators);
    if (nextProps.coordinators === prevState.coordinators) {
      if (nextProps.notificationList === prevState.notificationList) {
        return null;
      }
    }
    console.log(nextProps.coordinators);
    console.log(nextProps.notificationList);
    return {
      coordinators: nextProps.coordinators || [],
      notificationList: nextProps.notificationList
    };
  }

  constructor(props) {
    super(props);
    props.coordinatorsFetch();
    props.notificationListFetch();
    this.state = {
      coordinators: [],
      notificationList: []
    };
  }

  componentDidUpdate() {
    const criticals = this.getCriticals(this.state.coordinators);
    console.log(criticals);
    const uid = firebase.auth().currentUser.uid;
    console.log(uid);

    if (criticals.length > 0) {
      criticals.forEach((slice) => {
        const { appName, key, usersNotified } = slice;

        let userIds = _.map(usersNotified, (val) => {
          return val;
        });

        if (userIds === undefined) userIds = [];
        console.log(userIds);

        if (!userIds.includes(uid)) {
          this.props.flagSliceAsNotified({
            appName,
            sliceId: key,
            uid
          });
          console.log(this.state.notificationList);
          if (this.state.notificationList !== undefined) {
            console.log(appName);
            if (this.state.notificationList.includes(appName)) this.notify(slice);
          }
        }
      });
    }
  }

  getCriticals(coordinators) {
    const criticals = [];
    coordinators.forEach((slices) => {
      const sls = _.map(slices, (val, key) => {
        return { key, ...val };
      });

      const lastSlice = sls[sls.length - 1];
      if (lastSlice.status === "FAILED") criticals.push(lastSlice);
    });
    console.log(criticals);
    return criticals;
  }

  setAction(label) {
    if (label === label1) return () => Actions.Dashboard();
    else if (label === label2) return () => Actions.taggedResourcesList();
    else if (label === label3) return () => Actions.coordinatorsList();
    else if (label === label4) return () => Actions.listNotifications();
  }

  notify(slice) {
    console.log("entrato in notificazione");
    const { appName, status } = slice;
    console.log(slice);
    const localNotification = {
        title: `${appName} is: ${status}`,
        body: `${appName} is: ${status}`
    };
    console.log(localNotification);
    const schedulingOptions = {
        time: (new Date()).getTime() + 5
    };

    console.log(schedulingOptions);
    console.log("before schedule");

    Notifications.scheduleLocalNotificationAsync(
        localNotification, schedulingOptions
    );
  }
  render() {
    return (
      <View style={styles.overallContainer}>

        <View style={styles.squaresContainer}>
          <Square
            style={{ backgroundColor: '#F25022' }}
            onPress={this.setAction(label1)}
          >
            <Text>{label1}</Text>
          </Square>
          <Square
            style={{ backgroundColor: '#7FBA00' }}
            onPress={this.setAction(label2)}
          >
            <Text>{label2}</Text>
          </Square>
        </View>

        <View style={styles.squaresContainer}>
          <Square
            style={{ backgroundColor: '#FFB901' }}
            onPress={this.setAction(label3)}
          >
            <Text>{label3}</Text>
          </Square>

          <Square
            style={{ backgroundColor: '#00A3EE' }}
            onPress={this.setAction(label4)}
          >
            <Text>{label4}</Text>
          </Square>
        </View>

      </View>
    );
  }
}

const styles = {
  overallContainer: {
    flexDirection: 'column',
    flex: 1,
    margin: 5,
    marginRight: 0,
    justifyContent: 'center'
  },
  squaresContainer: {
    flexDirection: 'row',
    margin: 0,
    marginBottom: 0
  },
  squareText: {
    fontSize: 18
  }
};

const mapStateToProps = (state) => {
  const unorderedCoordinators = _.map(state.coordinators, (val) => {
    return { ...val };
  });
  console.log("unorderedCoordinators", unorderedCoordinators);

  const notificationList = _.map(state.notificationList, (val) => {
    return val;
  });
  console.log(notificationList);
  return { coordinators: unorderedCoordinators, notificationList };
};

export default connect(mapStateToProps, {
  coordinatorsFetch,
  flagSliceAsNotified,
  notificationListFetch
})(Beginning);
