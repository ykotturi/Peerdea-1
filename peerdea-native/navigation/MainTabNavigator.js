import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import ShareConceptScreen from '../screens/ShareConceptScreen';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GiveFeedbackScreen from '../screens/GiveFeedbackScreen';

// HomeStack follows a similar pattern as what is provided here: http://facebook.github.io/react-native/docs/navigation
const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home'
  }},
  CreateGroup: {
    screen: CreateGroupScreen,
    navigationOptions: {
      title: 'Create a Group'
    }
  },
  JoinGroup: {
    screen: JoinGroupScreen,
    navigationOptions: {
      title: 'Join a Group'
    }
  },
});

HomeStack.navigationOptions = ({navigation}) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
    tabBarVisible: false
  };
  return navigationOptions;
};

const ShareConceptStack = createStackNavigator({
  ShareConcept: {screen: ShareConceptScreen},
})

ShareConceptStack.navigationOptions = {
  tabBarLabel: 'Share Concepts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-images' : 'md-images'}
      />
  ),
};

const GiveFeedbackStack = createStackNavigator({
  GiveFeedback: GiveFeedbackScreen,
})

GiveFeedbackStack.navigationOptions = {
  tabBarLabel: 'Give Feedback',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
      />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  First: {
    screen: HomeStack
  },
  Second: {
    screen: ShareConceptStack
  },
  Third: {
    screen: GiveFeedbackStack
  },
  Fourth: {
    screen: SettingsStack
  }
});

