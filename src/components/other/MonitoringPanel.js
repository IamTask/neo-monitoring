import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import MonitoringUnit from './MonitoringUnit';

class MonitoringPanel extends Component {
  state = { response: [] };

  componentWillMount() {
    this.setState({
      response:
        [
          {
            name: 'userActionSynthesisDaily_1001',
            status: 'ok',
          },
          {
            name: 'exaudi',
            status: 'critical',
          },
          {
            name: 'enabler',
            status: 'warning',
          },
          {
             name: 'userActionSynthesisHourly',
             status: 'critical',
          },
          {
             name: 'adagio_db_chek_fe_rules',
             status: 'ok',
          },
          {
             name: 'dmpLoadKochavaThirdParty',
             status: 'critical',
          },
          {
             name: 'adagio-db',
             status: 'warning',
          },
          {
             name: 'gunseblabla',
             status: 'critical',
          },
          {
             name: 'hellospank',
             status: 'warning',
          },
          {
             name: 'spamspam',
             status: 'critical',
          },
          {
             name: 'nomeLungoLungoLungoLungooo',
             status: 'ok',
          },
          {
             name: 'asdasdasd',
             status: 'critical',
          },
          {
             name: 'nonSocheScrivere',
             status: 'warning',
          },
          {
             name: '1234',
             status: 'ok',
          },
          {
             name: '43121',
             status: 'ok',
          },
          {
             name: 'acnora',
             status: 'ok',
          },
          {
             name: 'viaviaviaiis',
             status: 'critical',
          },
          {
             name: 'splasshspam',
             status: 'ok',
          },
          {
             name: 'rrrrrr',
             status: 'critical',
          },
          {
             name: 'ssss',
             status: 'ok',
          },
          {
             name: 'qqqqqq',
             status: 'ok',
          },
          {
             name: 'ssssssssasd qew',
             status: 'critical',
          },
          {
             name: 'sbamFINISCIUTO',
             status: 'warning',
          }
        ]
      });
  }

  renderStatusAsMonitoringUnits() {
    const { response } = this.state;
    const reds = [];
    const greens = [];
    const yellows = [];

    for (const unit of response) {
        if (unit.status === "critical") reds.push(unit);
        else if (unit.status === "ok") greens.push(unit);
        else if (unit.status === "warning") yellows.push(unit);
    }

    const orderedUnits = [...reds, ...yellows, ...greens];
    console.log(orderedUnits);
    return orderedUnits.map(unit =>
      <MonitoringUnit
        key={unit.name}
        unitName={unit.name}
        status={unit.status}
      />
    );
  }
  render() {
    console.log(this.renderStatusAsMonitoringUnits());
    return (
      <ScrollView>
          <View style={styles.panelStyle}>{this.renderStatusAsMonitoringUnits()}</View>
      </ScrollView>
    );
  }
}

const styles = {
    panelStyle: {
      flex: 1,
      marginTop: 22,
      marginLeft: 20,
      flexDirection: 'column',
      justifyContent: "space-around",
      alignItems: "flex-start",
      backgroundColor: '#f9faff'
    }
};

export default MonitoringPanel;
