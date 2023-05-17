import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavStackParamList } from '../components/nav/StackNavFactory';

export default function Photo(
  props: StackScreenProps<NavStackParamList, 'Photo'>,
) {
  const { navigation } = props;
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Photo</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={{ color: 'white' }}>Go To Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
