import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { NavStackParamList } from '../navigators/SharedStackNav';

export default function Notifications(
  props: StackScreenProps<NavStackParamList, 'Notifications'>,
) {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Notifications</Text>
    </View>
  );
}
