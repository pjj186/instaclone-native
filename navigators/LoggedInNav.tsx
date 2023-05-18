import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notifications from '../screens/Notifications';
import { View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import Me from '../screens/Me';
import StackNavFactory from './StackNavFactory';

export type LoggedInTabParamList = {
  FeedTab: undefined;
  NotificationsTab: undefined;
  MeTab: undefined;
  SearchTab: undefined;
  CameraTab: undefined;
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
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="FeedTab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'home'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="SearchTab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'search'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="CameraTab"
        component={View}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'camera'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="NotificationsTab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'heart'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="MeTab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'person'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
