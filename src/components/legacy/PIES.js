import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';
import { data,
  contributionData,
  pieChartData,
  progressChartData
} from './data';

class Dashboard extends Component {
  render() {
    const height = 220;
    const width = Dimensions.get('window').width;
    const chartConfigs = [
        {
          backgroundColor: '#000000',
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          style: {
            borderRadius: 16
          }
        },
        {
          backgroundColor: '#022173',
          backgroundGradientFrom: '#022173',
          backgroundGradientTo: '#1b3fa0',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        },
        {
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
        },
        {
          backgroundColor: '#26872a',
          backgroundGradientFrom: '#43a047',
          backgroundGradientTo: '#66bb6a',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        },
        {
          backgroundColor: '#000000',
          backgroundGradientFrom: '#000000',
          backgroundGradientTo: '#000000',
          color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
        }, {
          backgroundColor: '#0091EA',
          backgroundGradientFrom: '#0091EA',
          backgroundGradientTo: '#0091EA',
          color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
        },
        {
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        },
        {
          backgroundColor: '#b90602',
          backgroundGradientFrom: '#e53935',
          backgroundGradientTo: '#ef5350',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        },
        {
          backgroundColor: '#ff3e03',
          backgroundGradientFrom: '#ff3e03',
          backgroundGradientTo: '#ff3e03',
          color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`
        }
    ];

    return (
      <ScrollView>
      {
          chartConfigs.map((chartConfig) => {
              const labelStyle = {
                color: chartConfig.color(),
                marginVertical: 10,
                textAlign: 'center',
                fontSize: 16
              };

              const graphStyle = {
                marginVertical: 8,
                ...chartConfig.style
              };

              return (
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
              );
          })
      }
      </ScrollView>
    );
  }
}

export default Dashboard;
