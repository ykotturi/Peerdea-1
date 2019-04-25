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

export class EnterGroupName extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Enter group name',
      memberName: 'Enter your name' 
    };
  }


  // first, should check to make sure valid group name (numbers and letters only, longer than 5 characters)
  // then, there should be some check as to whether the group name is already taken
  // if not already taken, submit API post request to create a new group
  // if it is taken, catch error and say group name already taken
  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(memberName) => this.setState({memberName})}
          value={this.state.memberName}
        />
      </View>
    );
  }
}


export default class JoinGroupScreen extends React.Component {

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
            style={{width: 300, height: 50}}
            source={require('../assets/images/peerdea-logo-draft.png')}
          />
        <Text style={styles.getStartedText}>Create a new group below:</Text>
        <EnterGroupName/>
        <Button raised 
          onPress={() => navigate('ShareConcept')}
          title="Create"
          color="#841584"
          accessibilityLabel="Create"
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
