import React from 'react';
import { View, ScrollView, Text as RNText } from 'react-native';
import { PieChart, LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Text, TSpan, LinearGradient, Defs, Stop, } from 'react-native-svg';
import * as shape from 'd3-shape';
import CoordinatorsPie from './CoordinatorsPie.js';
import CoordinatorsLineChartHourly from './CoordinatorsLineChartHourly';

class Dashboard extends React.PureComponent {

  render() {
    const Gradient = () => (
           <Defs key={'gradient'}>
               <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                   <Stop offset={'0%'} stopColor={'#36D7B7'} />
                   <Stop offset={'100%'} stopColor={'#407A52'} />
               </LinearGradient>
           </Defs>
    );

    return (
      <ScrollView style={{ backgroundColor: 'white', padding: 10 }}>
        <CoordinatorsPie />
        {/*
        <View style={{ padding: 10, backgroundColor: '#F2F1EF', }}>
          <RNText style={styles.chartHeader}>
            # Coordinators Running Hourly
          </RNText>
          <View style={styles.lineChartContainer}>
            <YAxis
                data={lineDataSourceY}
                contentInset={{ top: 20, bottom: 20 }}
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
                  data={lineDataSourceY}
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
      */}
      <CoordinatorsLineChartHourly />
      </ScrollView>
    );
  }
}

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
export default Dashboard;
