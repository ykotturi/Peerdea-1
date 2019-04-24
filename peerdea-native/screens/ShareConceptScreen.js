import React, { Component } from 'react';
import { Button, Image, View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
// because we're using mangaged apps version of expo (and not bare version):
import { ImagePicker, Permissions, Camera } from 'expo';
import { ConceptDescription } from '../components/ConceptDescription'; 
import { ConceptAuthor } from '../components/ConceptAuthor'; 


// PICK UP HERE
//TODO: change infrastructure of this file to make state hold multple values of what a concet is 

export default class ShareConcept extends React.Component {
  state = {
    author: null,
    image: null,
    story: null,
  };


  askPermissionsAsync = async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);
      // probably need to do something to verify that permissions
      // were actually granted
   };


  render() {
    let { image } = this.state //why would thi.state.image here give error this.state.image.image does not exist? where is this additional .image being appended?

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.getStartedText}>Share a concept with your group</Text>
      <ConceptAuthor onChangeText={(text) => this.setState({story})}/>
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
      <ConceptDescription/>
      <Button
        onPress={() => {
          Alert.alert('Thanks for sharing!');
        }}
        title="Share concept with my group"
        color="#841584"
        accessibilityLabel="Share concept with my group"
      />
      </View>
    );
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
    
    //uncomment below if you'd like to see what RESULT is, printed in console in expo
    //console.log('RESULT IS' + result);
    //console.log('RESULT.URI IS' + result.uri);

    console.log('RESULT IS' + result);
    console.log('RESULT.URI IS' + result.uri);
    console.log('RESULT.base64 IS' + result.base64);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _takePicture = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    console.log('RESULT IS' + result);
    console.log('RESULT.URI IS' + result.uri);
    console.log('RESULT.base64 IS' + result.base64);
    
    if (!result.cancelled) {
      this.setState({ image: result.uri });
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
});