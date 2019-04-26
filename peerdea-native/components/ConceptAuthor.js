import React, { Component } from 'react';
import { TextInput } from 'react-native';

export class ConceptAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Enter your name here:' };
  }


  // first, should check to make sure valid group name (numbers and letters only, longer than 5 characters)
  // then, there should be some check as to whether the group name is already taken
  // if not already taken, submit API post request to create a new group
  // if it is taken, catch error and say group name already taken
  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}