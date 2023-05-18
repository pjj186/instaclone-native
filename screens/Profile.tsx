import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { NavStackParamList } from '../navigators/StackNavFactory';

export default function Profile(
  props: StackScreenProps<NavStackParamList, 'Profile'>,
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
      <Text style={{ color: 'white' }}>Profile</Text>
    </View>
  );
}
