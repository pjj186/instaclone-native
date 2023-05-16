import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';

export type RootStackParamList = {
  Welcome: undefined;
  Login:
    | {
        username: string;
        password: string;
      }
    | undefined;
  CreateAccount: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: () => false,
        headerTransparent: true,
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,
        }}
        component={Welcome}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
