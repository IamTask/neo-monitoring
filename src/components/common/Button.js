import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
  const {
    buttonStyle,
    textStyle,
    smallButtonStyle,
    smallTextStyle
   } = styles;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={props.small === 'true' ? smallButtonStyle : buttonStyle}
    >
        <Text
          style={props.small === 'true' ? smallTextStyle : textStyle}
        >
          {props.children}
        </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 13,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    flex: 1,
    //height: 30,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  smallButtonStyle: {
    width: 70,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f9faff',
    borderRightWidth: 0,
    backgroundColor: "#999999",
  },
  smallTextStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  }
};
export { Button };
