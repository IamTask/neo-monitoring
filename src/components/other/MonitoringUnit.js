import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from './common';

class MonitoringUnit extends Component {
  getStatusStyle() {
    const {
      statusOkStyle,
      statusWarningStyle,
      statusCriticalstyle
    } = styles;

    if (this.props.status === "ok") return statusOkStyle;
    else if (this.props.status === "warning") return statusWarningStyle;
    else if (this.props.status === "critical") return statusCriticalstyle;
    return null;
  }

  getInspectContainerStyle() {
    return [styles.buttonContainerStyle, styles.roundedBorderStyle];
  }
  getNameContainerStyle() {
    return [
      styles.roundedBorderStyle,
      this.getStatusStyle(),
      { marginRight: 1.5 }
    ];
  }

  render() {
      const {
        unitStyle,
        textStyle,
      } = styles;

      return (
        <View style={unitStyle}>
            <View style={this.getNameContainerStyle()}>
              <Text style={textStyle}>
                  {this.props.unitName}
              </Text>
            </View>
            <View style={this.getInspectContainerStyle()}>
              <Button small='true'>
                <Text>Inspect</Text>
              </Button>
            </View>
        </View>
      );
  }
}

const styles = {
  roundedBorderStyle: {
      borderRadius: 5,
  },
  unitStyle: {
      width: 320,
      height: 23,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 0,
      marginTop: 8,
  },
  textStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft: 10,
  },
  statusOkStyle: {
      backgroundColor: "#15c435",
      flex: 1
  },
  statusWarningStyle: {
      backgroundColor: "#dbb50f",
      flex: 1
  },
  statusCriticalstyle: {
      backgroundColor: "#bc140b",
      flex: 1
  },
};


export default MonitoringUnit;
