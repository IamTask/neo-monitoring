import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const Square = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.square, props.style]}
    >
      <View style={[props.style, { flex: 1 }, styles.squareView]}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
};


const styles = {
  square: {
    flex: 1,
    aspectRatio: 1,

    margin: 5,
    marginLeft: 0,
    marginRight: 5,
    marginBottom: 0
  },

  squareView: {
    justifyContent: 'center',
    alignItems: 'center',
  }

};

export default Square;
