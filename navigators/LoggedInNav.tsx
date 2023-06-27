import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import SharedStackNav from './SharedStackNav';
import useMe from '../hooks/useMe';

export type LoggedInTabParamList = {
  FeedTab: undefined;
  NotificationsTab: undefined;
  MeTab: undefined;
  SearchTab: undefined;
  CameraTab: undefined;
};

const Tabs = createBottomTabNavigator<LoggedInTabParamList>();

export default function LoggedInNav() {
  const { data } = useMe();

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
        name='FeedTab'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'home'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName='Feed' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='SearchTab'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'search'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName='Search' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='CameraTab'
        component={View}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'camera'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='NotificationsTab'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'heart'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName='Notifications' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='MeTab'
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                source={{
                  uri: data?.me?.avatar,
                }}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  ...(focused && {
                    borderColor: 'white',
                    borderWidth: 1,
                  }),
                }}
              />
            ) : (
              <TabIcon iconName={'person'} color={color} focused={focused} />
            ),
        }}
      >
        {() => <SharedStackNav screenName='Me' />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
