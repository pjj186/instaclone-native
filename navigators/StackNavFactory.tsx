import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Photo from '../screens/Photo';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Me from '../screens/Me';
import { Image } from 'react-native';

interface IStackNavFactoryProps {
  screenName: string;
}

export type NavStackParamList = {
  Profile: undefined;
  Photo: undefined;
  Feed: undefined;
  Search: undefined;
  Me: undefined;
  Notifications: undefined;
};

const Stack = createStackNavigator<NavStackParamList>();

export default function StackNavFactory(props: IStackNavFactoryProps) {
  const { screenName } = props;

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
          shadowColor: 'rgba(255,255,255,0.3)',
        },
      }}
    >
      {screenName === 'Feed' ? (
        <Stack.Screen name="Feed" component={Feed} />
      ) : null}
      {screenName === 'Search' ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === 'Notifications' ? (
        <Stack.Screen name="Notifications" component={Notifications} />
      ) : null}
      {screenName === 'Me' ? <Stack.Screen name="Me" component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}
