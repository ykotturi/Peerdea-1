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
  state = {
    author: 'Enter your name here',
    author2: null,
    image: null,
    image1: null,
    image2: null,
    story: 'This is my concepts story!',
    imageBase64: null,
  };


  askPermissionsAsync = async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);
      // probably need to do something to verify that permissions
      // were actually granted
   };


  render() {
    let image = this.state.image;
    let author2 = this.state.author2;
    let image1 = this.state.image1;
    let image2 = this.state.image2; //why would thi.state.image here give error this.state.image.image does not exist? where is this additional .image being appended?

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.getStartedText}>Share a concept with your group</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({author:text})}
        value={this.state.author}
      />
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
      {image1 &&
      <Image source={{ uri: image1 }} style={{ width: 200, height: 200 }} />}
      {image2 &&
      <Image source={{ uri: image2 }} style={{ width: 200, height: 200 }} />}
      
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
      <Button
        onPress={() => { this._getConcepts();}}
        title="Get concepts"
        color="#841584"
        accessibilityLabel="Get concepts"
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


  _getConcepts = () => {

   

    return fetch('http://104.40.20.156/api/getConcepts', {method: 'GET'})
    .then((response) => response.json())
        .then((responseJson) => {
          let buff = new Buffer(responseJson.data[0].media.data);
           // console.log(responseJson.data[0].media.data);
           // image stored in database as buffer, so this line converts buffer to type base64
           // console.log('RESPONSEJSON.DATA[0].MEDIA.DATA.tostring is ' + responseJson.data[0].media.data.toString('base64'));
           const base64data = buff.toString('base64');
           // takes base64 and turns into uri
           const uriString = `data:image/gif;base64,${base64data}`;
           // console.log('uriString is ' + uriString);
           let buff2 = new Buffer(responseJson.data[4].media.data);
           // console.log(responseJson.data[0].media.data);
           // image stored in database as buffer, so this line converts buffer to type base64
           // console.log('RESPONSEJSON.DATA[0].MEDIA.DATA.tostring is ' + responseJson.data[0].media.data.toString('base64'));
           const base64data2 = buff2.toString('base64');
           // takes base64 and turns into uri
           const uriString2 = `data:image/gif;base64,${base64data2}`;
           console.log('AUTHORIS ' + responseJson.data[4].name);
           let author = responseJson.data[4].name;
           this.setState({
              image1: uriString,
              image2: uriString2,
              author2: author,
           })
        })
        .catch((error) => {
           console.error(error);
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
    
    //uncomment below if you'd like to see what RESULT is, printed in console in expo
    //console.log('RESULT IS' + result);
    //console.log('RESULT.URI IS' + result.uri);

    // console.log('RESULT IS' + result);
    // console.log('RESULT.URI IS' + result.uri);
    // console.log('THIS STATE is' + this.state);

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

    // console.log('RESULT IS' + result);
    // console.log('RESULT.URI IS' + result.uri);
   
    
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