import React from 'react';
import { View, Text, TextInput } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';
import styled from 'styled-components/native';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';

export default function CreateAccount(
  props: StackScreenProps<RootStackParamList, 'CreateAccount'>,
) {
  return (
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        returnKeyType="next"
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        returnKeyType="done"
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}
      />
      <AuthButton
        disabled={true}
        onPress={() => console.log('any')}
        text="Create Account"
      />
    </AuthLayout>
  );
}
