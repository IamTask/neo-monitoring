import React, { Component } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { taggedResourcesFetch } from '../actions';
import CoordinatorsList from './CoordinatorsList';

class TaggedResourcesList extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    console.log(prevState);
    if (nextProps.resources !== undefined) {
      console.log("ok");
      if (nextProps.resources === prevState.resources) {
        return null;
      }

      const resources = nextProps.resources;
      console.log(resources);

      return {
        resources,
      };
    }
    return { resources: [] };
  }


  constructor(props) {
    super(props);
    props.taggedResourcesFetch();
    this.state = {
      resources: []
    };
  }


  render() {
    console.log(this.state.resources);
    return (
      <View style={{ flex: 1 }}>
        <CoordinatorsList mode="tagged" resources={this.state.resources} />
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state.resources);
  const unorderedResources = _.map(state.resources, (val) => {
    return val;
  });
  console.log(unorderedResources);

  return { resources: unorderedResources || [] };
};

export default connect(mapStateToProps, { taggedResourcesFetch })(TaggedResourcesList);
