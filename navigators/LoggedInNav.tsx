import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Feed from '../screens/Feed';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import Search from '../screens/Search';

export type LoggedInTabParamList = {
  Feed: undefined;
  Notifications: undefined;
  Profile: undefined;
  Search: undefined;
};

const Tabs = createBottomTabNavigator<LoggedInTabParamList>();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'rgba(255,255,255, 0.3)',
        },
        tabBarActiveTintColor: 'white',
      }}
    >
      <Tabs.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="search" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="heart-outline"
              color={color}
              size={focused ? 24 : 20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
