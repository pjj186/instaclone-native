import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavStackParamList } from '../navigators/SharedStackNav';

export default function Search(
  props: StackScreenProps<NavStackParamList, 'Search'>,
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
      <Text style={{ color: 'white' }}>Search</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Photo')}>
        <Text style={{ color: 'white' }}>Go To Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
