import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Coordinator extends Component {


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.coordinator === prevState.coordinator) {
      return null;
    }
    console.log(nextProps.now);
    const now = nextProps.now;

    const { coordinator } = nextProps;
    const slices = _.map(coordinator.renderingInfo, (val) => {
      return { ...val };
    });

    return {
      now,
      slices,
      coordinator
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      now: 0,
      coordinator: {},
      slices: []
    };
  }

  getTotalSumOfDurationSlices(slices) {
    let totalDuration = 0;
    for (const slice of slices) {
      totalDuration += parseInt(slice.duration, 10);
    }

    const firstTimestamp = parseInt(slices[0].timestamp, 10);
    const lastTimestamp = parseInt(slices[slices.length - 1].timestamp, 10);
    console.log(lastTimestamp - firstTimestamp);
    return totalDuration;
  }

  calculateWidth(duration, overallDuration) {
    // duration: overallDuration = x: 100
    // duration * 100/max lastDuration

    const durationInt = parseInt(duration, 10);
    const overallDurationInt = parseInt(overallDuration, 10);
    const percentage = (durationInt * 100) / overallDurationInt;

    console.log("duration", duration);
    //console.log("durationInt", durationInt);
    console.log("highestDurationInt", overallDurationInt);
    console.log("percentage", percentage);

    if (percentage < 1) return 1;
    return percentage;
  }

  renderCoordinator() {
    console.log(this.props);
    const { coordinator } = this.props;
    console.log(coordinator.appName);
    const { slices } = this.state;

    const overallDuration = this.getTotalSumOfDurationSlices(slices);
    let sumOfWidths = 0;

    const viewsStyles = slices.map((slice) => {
      let colorStyle = null;
      if (slice.status === "SUCCEEDED") colorStyle = styles.successStyle;
      else if (slice.status === "WAITING") colorStyle = styles.waitingStyle;
      else if (slice.status === "RUNNING") colorStyle = styles.runningStyle;
      else if (slice.status === "FAILED") colorStyle = styles.failedStyle;

      const width = this.calculateWidth(slice.duration, overallDuration);
      sumOfWidths += width;

      const st = {
        ...colorStyle,
        ...styles.commonStyle
      };

      return { st, width };
    });
    console.log("sumOfWidths", sumOfWidths);
    let biggest = 0;
    for (const [index, val] of viewsStyles.entries()) {
      if (viewsStyles[biggest].width < val.width) {
        biggest = index;
      }
    }
    console.log("viewsStyles[biggest].width", viewsStyles[biggest].width);
    const excess = sumOfWidths - 100;
    if (excess > 0) {
      viewsStyles[biggest].width -= excess;

      console.log("excess", excess);
      console.log("viewsStyles[biggest].width", viewsStyles[biggest].width);
    }

    const views = viewsStyles.map((renderInfo) => {
      const { st, width } = renderInfo;
      const style = {
        ...st,
        width: `${width}%`
      };
      return <View style={style} />;
    });

    console.log("coordinator", coordinator);
    console.log("slices", slices);
    console.log("getTotalSumOfDurationSlices", overallDuration);
    console.log("views", views);

    return (
      <View>
        <View style={{ height: 18, backgroundColor: '#BFBFBF', marginLeft: 5, marginRight: 5 }}>
          <Text style={{ paddingLeft: 5 }}>{coordinator.appName}</Text>
        </View>
        <View style={{ flexDirection: 'row', margin: 5, marginTop: 0 }}>
        {
          views
        }
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 15 }}>
        {this.renderCoordinator()}
      </View>
    );
  }
}

const styles = {
  waitingStyle: {
    backgroundColor: '#F4D03F'
  },
  successStyle: {
    backgroundColor: '#26A65B'
  },
  runningStyle: {
    backgroundColor: '#22A7F0'
  },
  failedStyle: {
    backgroundColor: '#C91F37'
  },
  commonStyle: {
    height: 18,
  }
};

export default Coordinator;
