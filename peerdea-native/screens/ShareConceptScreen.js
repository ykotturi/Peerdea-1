import React, { Component } from 'react';
import { Button, Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// because we're using mangaged apps version of expo (and not bare version):
import { ImagePicker, Permissions, Camera } from 'expo';


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
    const {navigation} = this.props;
    const groupName = navigation.getParam('groupName', 'NO GROUP');
    const screenName = navigation.getParam('name', 'NO NAME');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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