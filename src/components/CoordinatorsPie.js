import React from 'react';
import { View, ScrollView, Text as RNText } from 'react-native';
import { PieChart, LineChart, Grid } from 'react-native-svg-charts';
import { Text, TSpan, LinearGradient, Defs, Stop, } from 'react-native-svg';
import { connect } from 'react-redux';
import _ from 'lodash';
import { coordinatorsFetch } from '../actions/CoordinatorsActions';

class CoordinatorsPie extends React.PureComponent {


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pieData === prevState.pieData) return null;

    const { pieData } = nextProps;
    return { pieData };
  }


  constructor(props) {
    super(props);
    this.state = {
      pieData: []
    };
    props.coordinatorsFetch();
  }

  renderPieLabel(slice, index, pieData) {
    const { labelCentroid, pieCentroid, data } = slice;
    console.log(pieData);
    return (
        <Text
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={'black'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={8}
            stroke={'black'}
            strokeWidth={0.2}
            style={{ whiteSpace: 'preline' }}
        >
           <TSpan x={pieCentroid[0]} >{pieData.type}</TSpan>
           <TSpan x={pieCentroid[0]} y={pieCentroid[1] + 10}>
             {pieData.value + " COORD."}
           </TSpan>
        </Text>
    );
  }
  render() {
    const pieData = this.state.pieData.map((val, index) => {
          return ({
            value: val.count,
            type: val.type,
            svg: {
                fill: val.color,
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`
          });
    });

    const PieLabels = ({ slices, height, width }) => {
       return slices.map((slice, index) => {
          const noZero = pieData[index].value > 0;
          if (noZero) return this.renderPieLabel(slice, index, pieData[index]);
          return null;
       });
   };
   return (
       <View style={styles.pieChartContainer}>
         <RNText style={styles.chartHeader}>
           Coordinators Status Right Now
         </RNText>
         <PieChart
             style={{ height: 200 }}
             valueAccessor={({ item }) => item.value}
             data={pieData}
             animate
         >
           <PieLabels />
         </PieChart>
       </View>
   );
  }
}

const styles = {
 pieChartContainer: {
   backgroundColor: '#F2F1EF',
   padding: 10,
   marginBottom: 10
 },
 chartHeader: {
  marginBottom: 10,
  textAlign: 'center',
  borderBottomWidth: 1
 }
};


const buildData = (greens, reds, yellows, blues) => {
  const pieData = [
    {
      type: 'SUCCEEDED',
      count: greens,
      color: '#26A65B'
    },
    {
      type: 'FAILED',
      count: reds,
      color: '#C91F37'
    },
    {
      type: 'WAITING',
      count: yellows,
      color: '#F4D03F'
    },
    {
      type: 'RUNNING',
      count: blues,
      color: '#22A7F0'
    }
  ];
  return pieData;
};
const mapStateToProps = (state) => {
  const { coordinators } = state;
  console.log(coordinators);

  const coords = _.map(coordinators, (coordinator) => {
    return { ...coordinator };
  });
  let greens = 0;
  let reds = 0;
  let yellows = 0;
  let blues = 0;

  coords.forEach((slices) => {
    const slicesToArray = _.map(slices, (sls) => {
      return { ...sls };
    });

    const lastSlice = slicesToArray[slicesToArray.length - 1];
    if (lastSlice.status === "SUCCEEDED") greens++;
    else if (lastSlice.status === "RUNNING") blues++;
    else if (lastSlice.status === "WAITING") yellows++;
    else if (lastSlice.status === "FAILED") reds++;
  });

  const pieData = buildData(greens, reds, yellows, blues);
  console.log("PieData", pieData);
  return { pieData };
};

export default connect(mapStateToProps, { coordinatorsFetch })(CoordinatorsPie);
