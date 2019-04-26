import React, { Component } from 'react';
import { Button, Image, View, StyleSheet, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
// because we're using mangaged apps version of expo (and not bare version):
import { ImagePicker, Permissions, Camera } from 'expo';
import { ConceptDescription } from '../components/ConceptDescription'; 
import { ConceptAuthor } from '../components/ConceptAuthor'; 
import { Buffer } from 'buffer';

// PICK UP HERE
//TODO: change infrastructure of this file to make state hold multple values of what a concet is 

export default class ShareConcept extends React.Component {
  static navigationOptions = {
    title: 'Share a Concept',
  };

  state = {
    author: '',
    image: null,
    story: 'This is my concepts story!',
    imageBase64: null,
  };


  askPermissionsAsync = async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);
      // probably need to do something to verify that permissions
      // were actually granted
   };

  componentDidMount() {
    const {navigation} = this.props;
    const screenName = navigation.getParam('name', 'NO NAME');
    this.setState({author: screenName});
  }


  render() {
    const {navigation} = this.props;
    const groupName = navigation.getParam('groupName', 'NO GROUP');
    const screenName = navigation.getParam('name', 'NO NAME');
    let image = this.state.image;
    // this.setState({author: screenName});
    // uncomment for testing encoding and decoding
    // let author2 = this.state.author2;
    // let image1 = this.state.image1;
    // let image2 = this.state.image2; 

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{width: 300, height: 50}}
          source={require('../assets/images/peerdea-logo-draft.png')}
        />
        <Text>Welcome to {groupName}, {screenName}</Text>
      <Button
        title="Pick an image from camera roll"
        onPress={this._pickImage}
      />
      <Button
        title="Take a picture"
        onPress={this._takePicture}
      />
      {image &&
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {/* {image1 && <Image source={{ uri: image1 }} style={{ width: 200, height: 200 }} />} {image2 && <Image source={{ uri: image2 }} style={{ width: 200, height: 200 }} />}*/}
      
      <Text> {this.state.author2} </Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({story:text})}
        value={this.state.story}
      />
      <Button
        onPress={() => { this._sendConcept();}}
        title="Share concept with my group"
        color="#841584"
        accessibilityLabel="Share concept with my group"
      />
      </View>
      </ScrollView>
    );
  }

  _sendConcept = () => {

      
      // get requests to get users group keyword

      var buff = new Buffer(this.state.imageBase64, 'base64');
      
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          group_id: "5cb7d06d5de2e75344837340",
    		  name: this.state.author,
    		  media: { 
            data: buff, 
            contentType: 'image/png'},
    	      description: this.state.story,
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          // 'X-CSRFToken':  cookie.load('csrftoken')
          }
       }
        Alert.alert('Thanks for sharing!');
        return fetch('http://104.40.20.156/api/putConcept', data)
        .then(function(response){
          return response.json();
        })
        .then(function(json){
         console.log('suuccess');
        })
        .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        });

   }


  //underscore before function name to distinguish internal methods from the lifecycle methods of react
  _pickImage = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    // probably need some express api post call to add "result" variable to database

    if (!result.cancelled) {
      this.setState({ image: result.uri, imageBase64: result.base64 });
    }
  };

  _takePicture = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    
    if (!result.cancelled) {
      this.setState({  image: result.uri,imageBase64 : result.base64 });
    }
  };

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});