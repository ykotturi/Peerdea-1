import React, { Component } from 'react';
import { Button, 
          Image, 
          View, 
          StyleSheet, 
          Text, 
          TouchableOpacity, 
          TouchableHighlight, 
          TextInput, 
          Alert, 
          ScrollView, 
          Modal } from 'react-native';
// because we're using mangaged apps version of expo (and not bare version):
import { ImagePicker, 
         Permissions, 
         Camera } from 'expo';
import { Buffer } from 'buffer';
import Collapsible from 'react-native-collapsible';
import ImageCarousel from 'react-native-image-carousel';
import Concept from '../components/Concept';

// PICK UP HERE
//TODO: change infrastructure of this file to make state hold multple values of what a concet is 

export default class GiveFeedback extends React.Component {
  state = {
    author: null,
    group_id: null,
    concepts: [],
  };

  componentDidMount() {
    const {navigation} = this.props;
    // this._navListener = navigation.addListener('didFocus', () => {
    const screenName = navigation.getParam('name', 'NO NAME');
    console.log(screenName);
    const groupID = navigation.getParam('groupID', '5cc211a9a158040015716bac');
    console.log(groupID);
    this.setState({author: screenName, group_id: groupID});
    this.getConcepts(groupID);
    // });
  };

  componentWillReceiveProps(nextProps) {
    const screenName = nextProps.navigation.getParam('name', 'NO NAME');
    const groupID = nextProps.navigation.getParam('groupID', '5cc211a9a158040015716bac');
    this.setState({author: screenName, group_id: groupID});
    this.getConcepts(groupID);
  };

  async getConcepts(groupid) {
    console.log('groupid get concepts ' + groupid);
    const res = await fetch('http://104.40.20.156/api/getConceptsByGroup?groupID=' + groupid, {method: 'GET'});
    const resJson = await res.json();
    concepts = resJson.data;
    for (i = 0; i < resJson.data.length; i++) {
      concepts[i].isCollapsed = true;
    }
    this.setState({concepts: concepts});
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.getStartedText}>Review Group Concepts</Text>
        {this.state.concepts.map(concept => (
              <Concept key={concept._id} concept={concept} />
            ))}
      </View>

      </ScrollView>
    );
  }





}


const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 30, 
    flex: 1, 
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
   absoluteView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});