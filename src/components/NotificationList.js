import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { coordinatorsFetch, notificationListFetch } from '../actions';
import NotificationItem from './NotificationItem';


class NotificationList extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    if (nextProps.coordinators === prevState.coordinators) {
      if (nextProps.notificationList === prevState.notificationList) {
        return null;
      }
    }

    const coordinators = nextProps.coordinators;
    console.log(coordinators);

    const coordinatorsNames = [];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    if (coordinators !== undefined && coordinators.length > 0) {
      for (const coordinator of coordinators) {
        const coord = _.map(coordinator, (val) => {
          return { ...val };
        });
        coordinatorsNames.push(coord[0].appName);
      }
    }


    let notificationList = nextProps.notificationList;
    if (nextProps.notificationList === undefined) notificationList = [];
    console.log(notificationList);
    return {
      notificationList,
      coordinators,
      coordinatorsNames,
      dataSource: ds.cloneWithRows(coordinatorsNames)
    };
  }

  constructor(props) {
    super(props);
    props.coordinatorsFetch();
    props.notificationListFetch();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      coordinatorsNames: [],
      dataSource: ds,
      coordinators: [],
    };
  }

  clear() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        this.state.coordinatorsNames
      )
    });
  }
  filterCoordinators(coordinatorName) {
    if (coordinatorName === "") {
      this.clear();
    }
    console.log(this.state);
    const selectedCoordinatorNames = [];
    if (this.state.coordinatorsNames !== undefined) {
      for (const name of this.state.coordinatorsNames) {
        if (name.includes(coordinatorName)) {
          selectedCoordinatorNames.push(name);
        }
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(selectedCoordinatorNames)
      });
    }
  }

  renderRow(coordinatorName) {
    let isPresent = false;
    console.log(this.state);
    if (this.state.notificationList.includes(coordinatorName)) {
      isPresent = true;
    }
    console.log(coordinatorName, isPresent);
    return <NotificationItem coordinatorName={coordinatorName} isPresent={isPresent} />;
  }

  render() {
    return (
      <View>
          <SearchBar
            clearIcon={{ color: 'black' }}
            lightTheme
            onChangeText={this.filterCoordinators.bind(this)}
            onClear={this.clear.bind(this)}
            placeholder='Cerca un coordinator...'
          />

          <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
      </View>
    );
  }
}

  const mapStateToProps = (state) => {
    console.log(state);
    const coordinators = _.map(state.coordinators, (val) => {
      return { ...val };
    });
    console.log(coordinators);

    const notificationList = _.map(state.notificationList, (val) => {
        return val;
    });
    console.log(notificationList);
    return { coordinators, notificationList };
  };

export default connect(
  mapStateToProps,
  {
    coordinatorsFetch,
    notificationListFetch
  })(NotificationList);
