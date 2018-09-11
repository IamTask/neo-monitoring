import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit';

const pieChartData = [
  { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
];

class Dashboard extends Component {
  render() {
    const height = 220;
    const width = Dimensions.get('window').width;
    const {
      backgroundColor,
      backgroundGradientFrom,
      backgroundGradientTo,
      color,
      style
    } = chartConfig;
    const graphStyle = {
      marginVertical: 8,
      //...chartConfig.style
    };

    const labelStyle = {
      color: chartConfig.color(),
      marginVertical: 10,
      textAlign: 'center',
      fontSize: 16
    };

    return (
      <ScrollView>
          <ScrollView
            key={Math.random()}
            style={{ backgroundColor: chartConfig.backgroundColor }}
          >
            <PieChart
              data={pieChartData}
              height={height}
              width={width}
              chartConfig={chartConfig}
              accessor="population"
              style={graphStyle}
            />
          </ScrollView>
      </ScrollView>
    );
  }
}

const chartConfig = {
  backgroundColor: '#0091EA',
  backgroundGradientFrom: '#0091EA',
  backgroundGradientTo: '#0091EA',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  }
};

export default Dashboard;
