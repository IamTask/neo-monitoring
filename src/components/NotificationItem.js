import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection } from './common';
import { addToNotificationList, deleteFromNotificationList } from '../actions';

class ListItem extends Component {

  onButtonPress(coordinatorName, action) {
    console.log(coordinatorName);
    if (action === "add") this.props.addToNotificationList(coordinatorName);
    else if (action === "delete") this.props.deleteFromNotificationList(coordinatorName);
  }

  renderButton(isPresent, name) {
    if (isPresent) {
      return (
        <Button
          title='Delete'
          buttonStyle={styles.buttonStyle}
          onPress={this.onButtonPress.bind(this, name, "delete")}
        />
      );
    }

    return (
      <Button
        title='Add'
        buttonStyle={styles.buttonStyle}
        onPress={this.onButtonPress.bind(this, name, "add")}
      />
    );
  }
  render() {
    const name = this.props.coordinatorName;
    return (
      <TouchableWithoutFeedback>
        <View>
          <CardSection style={styles.containerStyle}>
            <Text style={styles.titleStyle}>
             {name}
            </Text>
             {
              this.renderButton(this.props.isPresent, name)
             }

          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle:
  {
    fontSize: 18,
    paddingLeft: 15
  },
  buttonStyle: {
    //backgroundColor: "rgba(92, 99,216, 1)",
    width: 65,
    height: 30,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    margin: 0,
  },
  containerStyle: {
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center'
  }
};

export default connect(
  null,
  {
    addToNotificationList,
    deleteFromNotificationList
  })(ListItem);
