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

// HomeStack follows a similar pattern as what is provided here: http://facebook.github.io/react-native/docs/navigation
const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
  CreateGroup: {screen: CreateGroupScreen},
  JoinGroup: {screen: JoinGroupScreen},
  ShareConcept: {screen: ShareConceptScreen},
});

HomeStack.navigationOptions = {
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
  HomeStack,
  // LinksStack,
  SettingsStack,
});

// import React, { Component } from 'react';
// import { Dimensions, Platform } from 'react-native';
// import { StackNavigator, TabNavigator } from 'react-navigation';
// import { Icon } from 'react-native-elements';

// import HomeScreen from '../screens/HomeScreen';
// import LinksScreen from '../screens/LinksScreen';
// import CreateGroupScreen from '../screens/CreateGroupScreen';
// import ShareConceptScreen from '../screens/ShareConceptScreen';
// import JoinGroupScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';

// let screen = Dimensions.get('window');

// export const Tabs = TabNavigator({
//   'Home': {
//     screen: HomeScreen,
//     navigationOptions: {
//       tabBarLabel: 'Home',
//       tabBarIcon: ({ tintColor }) => <Icon name="open-book" type="entypo" size={28} color={tintColor} />
//     },
//   },
//   'Create Group': {
//     screen: CreateGroupScreen,
//     navigationOptions: {
//       tabBarLabel: 'Create Group',
//       tabBarIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={28} color={tintColor} />
//     },
//   },
//   'Join Group': {
//     screen: JoinGroupScreen,
//     navigationOptions: {
//       tabBarLabel: 'Join Group',
//       tabBarIcon: ({ tintColor }) => <Icon name="ios-add-circle-outline" type="ionicon" size={28} color={tintColor} />
//     },
//   },
//   'Share Concept': {
//     screen: ShareConceptScreen,
//     navigationOptions: {
//       tabBarLabel: 'Share Concept',
//       tabBarIcon: ({ tintColor }) => <Icon name="list" type="entypo" size={28} color={tintColor} />
//     },
//   },
//   'Settings': {
//     screen: SettingsScreen,
//     navigationOptions: {
//       tabBarLabel: 'Settings',
//       tabBarIcon: ({ tintColor }) => <Icon name="ios-person-outline" type="ionicon" size={28} color={tintColor} />
//     },
//   },
// });

// export const createRootNavigator = () => {
//   return StackNavigator(
//     {
//       Tabs: {
//         screen: Tabs,
//         navigationOptions: {
//           gesturesEnabled: false
//         }
//       }
//     },
//   );
// };