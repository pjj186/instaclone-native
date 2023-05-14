import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

export default function Login(
  props: StackScreenProps<RootStackParamList, 'Login'>,
) {
  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        returnKeyType="next"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
      />
    </AuthLayout>
  );
}
