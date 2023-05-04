import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';

export default function Welcome(
  props: StackScreenProps<RootStackParamList, 'Welcome'>,
) {
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('CreateAccount')}
      >
        <View>
          <Text>Go to Create Account</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
        <View>
          <Text>Go to Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
