import React, { Component } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
// because we're using mangaged apps version of expo (and not bare version):
import { ImagePicker, Permissions } from 'expo';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };


  askPermissionsAsync = async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      // probably need to do something to verify that permissions
      // were actually granted
   };


  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
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

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}