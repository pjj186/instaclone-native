import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Photo from '../screens/Photo';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Me from '../screens/Me';
import { Image, View } from 'react-native';
import Likes from '../screens/Likes';
import Comments from '../screens/Comments';

interface ISharedStackNavProps {
  screenName: string;
}

export type NavStackParamList = {
  Profile:
    | {
        username: string;
        id: number;
      }
    | undefined;
  Photo: {
    photoId: number;
  };
  Feed: undefined;
  Search: undefined;
  Me: undefined;
  Notifications: undefined;
  Likes: {
    photoId: number;
  };
  Comments: undefined;
};

const Stack = createStackNavigator<NavStackParamList>();

export default function SharedStackNav(props: ISharedStackNavProps) {
  const { screenName } = props;

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
          shadowColor: 'rgba(255,255,255,0.3)',
        },
      }}
    >
      {screenName === 'Feed' ? (
        <Stack.Screen
          name='Feed'
          component={Feed}
          options={{
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  style={{
                    maxHeight: 80,
                  }}
                  resizeMode='contain'
                  source={require('../assets/logo.png')}
                />
              </View>
            ),
          }}
        />
      ) : null}
      {screenName === 'Search' ? (
        <Stack.Screen name='Search' component={Search} />
      ) : null}
      {screenName === 'Notifications' ? (
        <Stack.Screen name='Notifications' component={Notifications} />
      ) : null}
      {screenName === 'Me' ? <Stack.Screen name='Me' component={Me} /> : null}
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Photo' component={Photo} />
      <Stack.Screen name='Likes' component={Likes} />
      <Stack.Screen name='Comments' component={Comments} />
    </Stack.Navigator>
  );
}
