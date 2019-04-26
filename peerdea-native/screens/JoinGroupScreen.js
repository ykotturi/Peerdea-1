import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Button } from 'react-native-elements';

export default class JoinGroupScreen extends React.Component {
  state = {
    groupName: '',
    memberName: ''
  };

  async onJoin() {
    console.log("join pressed "+ this.state.groupName);
    try {
      //check if the group exists first
      const checkRes = await fetch('http://128.237.194.92:3001/api/getGroupByName?name=' + this.state.groupName, {method: 'GET'});
      const checkResJson = await checkRes.json();
      console.log("print " + JSON.stringify(checkResJson.data));

      //if the group does not exist, notify the user to create a new group name
      if (checkResJson.data.length == 0) {
        Alert.alert(
          'Group ' + this.state.groupName + ' does not exist',
          'Please try again with a different group name',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      } 
      //if the group exists, redirect the screen to the create concept screen
      else {
        this.props.navigation.navigate('ShareConcept', {
          groupName: this.state.groupName,
          name: this.state.memberName
        });
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
            style={{width: 300, height: 50}}
            source={require('../assets/images/peerdea-logo-draft.png')}
          />
        <Text style={styles.getStartedText}>Join a group below:</Text>
        <View style={{flexDirection: 'row'}}> 
          <TextInput
            style={{height: 40, flex: 0.5, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({groupName: text})}
            placeholder="Enter your group name here"
          />
        </View>
        <View style={{flexDirection: 'row'}}> 
          <TextInput
            style={{height: 40, flex: 0.5, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({memberName: text})}
            placeholder="Enter your screen name here"
          />
        </View>
        <Button raised 
          onPress={() => this.onJoin()}
          title="Join"
          color="#841584"
          accessibilityLabel="Join"
        />
       </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 30, 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
