import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';

export type LoggedInTabParamList = {
  Feed: undefined;
};

const Tabs = createBottomTabNavigator<LoggedInTabParamList>();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Feed" component={Feed} />
    </Tabs.Navigator>
  );
}
