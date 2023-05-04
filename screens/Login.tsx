import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';

export default function Login(
  props: StackScreenProps<RootStackParamList, 'Login'>,
) {
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('CreateAccount')}
      >
        <Text>Go to Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
