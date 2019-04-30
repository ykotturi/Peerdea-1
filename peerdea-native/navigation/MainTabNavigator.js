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
  CreateGroup: {screen: CreateGroupScreen},
  JoinGroup: {screen: JoinGroupScreen},
  ShareConcept: {screen: ShareConceptScreen},
  GiveFeedback: {screen: GiveFeedbackScreen},
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
  };
  if (routeName === 'Home') {
    navigationOptions.tabBarVisible = false;
  };
  return navigationOptions;
};

// const LinksStack = createStackNavigator({
//   Links: LinksScreen,
// });

// LinksStack.navigationOptions = {
//   tabBarLabel: 'Links',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
//     />
//   ),
// };

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
    screen: SettingsStack
  }
});
