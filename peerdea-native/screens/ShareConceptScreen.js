import React, { Component } from 'react';
import { Button, Image, View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
// because we're using mangaged apps version of expo (and not bare version):
import { ImagePicker, Permissions, Camera } from 'expo';



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

export class ConceptDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Describe your concept here' };
  }


  // first, should check to make sure valid group name (numbers and letters only, longer than 5 characters)
  // then, there should be some check as to whether the group name is already taken
  // if not already taken, submit API post request to create a new group
  // if it is taken, catch error and say group name already taken
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


export default class ConceptImagePicker extends React.Component {
  state = {
    image: null,
    //should probably have permissions variable in state
  };


  askPermissionsAsync = async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);
      // probably need to do something to verify that permissions
      // were actually granted
   };


  render() {
    let { image } = this.state;

    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={styles.getStartedText}>Share a concept with your group</Text>

      <ConceptAuthor/>

      
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

  _pickImage = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    // probably need some express api post call to add "result" variable to database
    
    //uncomment below if you'd like to see what RESULT is, printed in console in expo
    //console.log('RESULT IS' + result);
    //console.log('RESULT.URI IS' + result.uri);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _takePicture = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    
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