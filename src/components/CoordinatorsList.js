import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { coordinatorsFetch } from '../actions/CoordinatorsActions';
import Coordinator from './Coordinator';
import { Button, CardSection } from './common';

class CoordinatorsList extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    if (nextProps.coordinators === prevState.coordinators) {
      return null;
    }

    let coordinators = nextProps.coordinators;
    console.log(coordinators);

    const selectedResources = [];
    if (nextProps.mode !== undefined && nextProps.mode === "tagged") {
      console.log(nextProps.resources);
      console.log(nextProps.resources.length);
      if (nextProps.resources !== undefined && nextProps.resources.length > 0) {
        for (const coordinator of coordinators) {
          console.log("cycled Coord: ", coordinator);
          const coord = _.map(coordinator, (val) => {
            return { ...val };
          });
          console.log("lodashed coord: ", coord);
          console.log(coord[0].appName);
          if (nextProps.resources.includes(coord[0].appName)) {
            selectedResources.push(coordinator);
          }
        }
        console.log(selectedResources);
        coordinators = selectedResources;
      }
    }

    return {
      coordinators,
    };
  }

  constructor(props) {
    console.log("Constructor");
    super(props);
    props.coordinatorsFetch();
    this.state = {
      coordinators: [],
      dataSource: [],
      refresh: false
    };
  }

  onButtonPress() {
    console.log("button pressed");
    this.setState({ refresh: !this.state.refresh });
    this.forceUpdate();
    console.log("updated");
  }

  processDataForRendering(singleCoordinator) {
    console.log(singleCoordinator);
    const slicesToArray = _.map(singleCoordinator, (val) => {
      return { ...val };
    });
    console.log(slicesToArray);
    const renderingInfo = [];
    for (let k = 0; k < slicesToArray.length - 1; k++) {
      const thisSlice = slicesToArray[k];
      const nextSlice = slicesToArray[k + 1];
      console.log(thisSlice);
      const thisSliceTimestamp = thisSlice.timestamp;
      const nextSliceTimestamp = nextSlice.timestamp;
      const duration = nextSliceTimestamp - thisSliceTimestamp;
      console.log("thisSliceTimestamp", thisSliceTimestamp);
        console.log("nextSliceTimestamp", nextSliceTimestamp);
      console.log("durationInList", duration);
      renderingInfo.push({
        timestamp: thisSliceTimestamp,
        duration,
        status: thisSlice.status
      });
    }
//15333 06451700
//15335 37846500"
    const lastTimestamp = slicesToArray[slicesToArray.length - 1].timestamp;
    console.log(lastTimestamp);
    const todayTimestamp = new Date().valueOf();
    const lastDuration = todayTimestamp - lastTimestamp;
    console.log("LASTDURATION: ", lastDuration);
    const statusOfLast = slicesToArray[slicesToArray.length - 1].status;
    renderingInfo.push({
      timestamp: lastTimestamp,
      duration: lastDuration,
      status: statusOfLast
    });
    return { appName: slicesToArray[0].appName, renderingInfo };
  }

  keyExtractor(item) {
    return item.timestamp;
  }
  renderRow(coordinator) {
    console.log(coordinator);
    const renderingInfo = this.processDataForRendering(coordinator.item);
    console.log(renderingInfo);
    const now = new Date().valueOf();
    return <Coordinator now={now} coordinator={renderingInfo} />;
  }

  render() {
    console.log(this.state.coordinators);
    return (
      <View style={{ flex: 1 }}>

        <FlatList
          data={this.state.coordinators}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={this.keyExtractor}
          extraData={this.state.refresh}
        />

        {
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Refresh
            </Button>
          </CardSection>
        }
      </View>
    );
  }
}

const sortByCriticality = (coordinators) => {
  const waiting = [];
  const succeeded = [];
  const failed = [];
  const running = [];

  for (const coordinator of coordinators) {
    const slices = _.map(coordinator, (val) => {
      return { ...val };
    });
    console.log(slices);
    const lastSlice = slices[slices.length - 1];
    console.log(lastSlice);
    switch (lastSlice.status) {
      case "FAILED":
        failed.push(coordinator);
        break;
      case "WAITING":
        waiting.push(coordinator);
        break;
      case "RUNNING":
        running.push(coordinator);
        break;
      case "SUCCEEDED":
        succeeded.push(coordinator);
        break;
      default:
        break;
    }
  }
  console.log(succeeded);
  const orderedArray = [...failed, ...waiting, ...running, ...succeeded];
  console.log(orderedArray);
  return orderedArray;
};

const mapStateToProps = (state) => {
  console.log(state);
  const unorderedCoordinators = _.map(state.coordinators, (val) => {
    return { ...val };
  });
  console.log(unorderedCoordinators);

  const orderedCoordinators = sortByCriticality(unorderedCoordinators);
  return { coordinators: orderedCoordinators };
};


export default connect(mapStateToProps, { coordinatorsFetch })(CoordinatorsList);
