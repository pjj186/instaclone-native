import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavStackParamList } from '../navigators/SharedStackNav';

export default function Profile({
  navigation,
  route,
}: StackScreenProps<NavStackParamList, 'Profile'>) {
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params?.username + "'s Profile",
      });
    }
  }, []);

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
