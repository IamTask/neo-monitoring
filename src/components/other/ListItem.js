import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';


class ListItem extends Component {
  componentWillMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  componentWillUpdate() {
    LayoutAnimation.spring();
  }
  renderDescription() {
    const { library, expanded } = this.props;
    console.log(expanded);
    //debugger;
    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1 }}>
            {library.item.description}
          </Text>
        </CardSection>
      );
    }
    return null;
  }
  render() {
    const { id, title } = this.props.library.item;
    return (
      <TouchableWithoutFeedback
        onPress={
          () => this.props.selectLibrary(id)
        }
      >
        <View>
          <CardSection style={styles.titleStyle}>
            <Text>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.item.id;
  //console.log(expanded);
  return {
    expanded
  };
};
export default connect(mapStateToProps, actions)(ListItem);

// il primo argomento è null perché si riferisce all'oggetto mapStateToProps
// in questo caso non ce l'abbiamo perché non ci interessa
// prelevare nessuno mapStateToProps
// il secondo parametro invece serve a registrare le actions
// Cosa accade quindi?

// le actions vengono passate come props all'oggetto collegato
// le action non sono più semplici oggetti, ma diventano
// vere e proprie azioni che vengono dispachate a tutti i reducer
// dentro lo store Redux automaticamente

// abbiamo quindi delle vere azioni come props dentro l'oggetto

// è il metodo connect che fa il binding tra action oggetto
// e reducers e store
