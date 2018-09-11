import React, { Component } from 'react';
import { View, ScrollView, Text as RNText } from 'react-native';
import { PieChart, LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Text, TSpan, LinearGradient, Defs, Stop, } from 'react-native-svg';
import { connect } from 'react-redux';
import _ from 'lodash';
import { coordinatorsFetch } from '../actions/CoordinatorsActions';
import * as shape from 'd3-shape';

class CoordinatorsLineChartHourly extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    const { chartData } = nextProps;
    if (chartData === prevState.charData) return null;

    return { chartData };
  }
  constructor(props) {
    super(props);
    props.coordinatorsFetch();
    this.state = {
      chartData: []
    };
  }
  render() {
    const lineDataSourceX = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    ];
    const Gradient = () => (
           <Defs key={'gradient'}>
               <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                   <Stop offset={'0%'} stopColor={'#36D7B7'} />
                   <Stop offset={'100%'} stopColor={'#407A52'} />
               </LinearGradient>
           </Defs>
    );
    return (
      <View style={{ padding: 10, backgroundColor: '#F2F1EF', }}>
        <RNText style={styles.chartHeader}>
          # Coordinators Running Hourly
        </RNText>
        <View style={styles.lineChartContainer}>
          <YAxis
              data={this.state.chartData}
              contentInset={{ top: 20, bottom: 20, width: 10 }}
              svg={{
                  fill: 'grey',
                  fontSize: 10,
              }}
              numberOfTicks={10}
              formatLabel={value => value}
          />
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <LineChart
                style={{ flex: 1, marginLeft: 16 }}
                data={this.state.chartData}
                svg={{
                    strokeWidth: 2,
                    stroke: 'url(#gradient)',
                }}
                contentInset={{ top: 20, bottom: 20 }}
                animate
                animationDuration={300}
                curve={shape.curveNatural}
            >
              <Grid />
              <Gradient />
            </LineChart>
            <XAxis
               xAccessor={({ item }) => item}
               style={{ paddingLeft: 10 }}
               data={lineDataSourceX}
               formatLabel={value => value}
               contentInset={{ left: 10, right: 10 }}
               svg={{ fontSize: 8, fill: 'black' }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const calculateHourly = (coords) => {
  const runningPerHour = [];
  for (let hour = 1; hour <= 24; hour++) {
    const cos = _.map(coords, (val) => {
      return { ...val };
    });

    let coordinatorsRunningThisHour = 0;
    cos.forEach((sls) => {
      const slices = _.map(sls, (sl) => {
        return { ...sl };
      });
      //console.log(slices);
      slices.forEach((slice) => {
        const h = new Date(parseInt(slice.timestamp, 10)).getHours();
        //console.log(slice);
        //console.log("h: ", h);
        //console.log("H: ", hour);
        if (slice.status === "RUNNING" && hour === h) coordinatorsRunningThisHour++;
      });
    });
    runningPerHour.push(coordinatorsRunningThisHour);
  }
  return runningPerHour;
};

const mapStateToProps = (state) => {
  const { coordinators } = state;
  const coords = _.map(coordinators, (val) => {
    return { ...val };
  });
  const runningPerHour = calculateHourly(coords);
  console.log(runningPerHour);

  return { chartData: runningPerHour };
};

export default connect(mapStateToProps, { coordinatorsFetch })(CoordinatorsLineChartHourly);

const styles = {
  pieChartContainer: {
    backgroundColor: '#F2F1EF',
    padding: 10,
    marginBottom: 10
  },
  lineChartContainer: {
    height: 200,
    flexDirection: 'row',
    marginTop: 0,
    padding: 10
  },
  chartHeader: {
   marginBottom: 10,
   textAlign: 'center',
   borderBottomWidth: 1
  }
};
