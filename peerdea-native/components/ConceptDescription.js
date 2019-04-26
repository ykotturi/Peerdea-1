import React, { Component } from 'react';
import { TextInput } from 'react-native';

export class ConceptDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Describe your concept here' };
  }
  render() {
    return (
      <TextInput
        style={{height: 70, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}