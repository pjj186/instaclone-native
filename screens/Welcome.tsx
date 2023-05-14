import React from 'react';
import { TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';
import styled from 'styled-components/native';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';

const LoginLink = styled.Text`
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

export default function Welcome(
  props: StackScreenProps<RootStackParamList, 'Welcome'>,
) {
  const goToCreateAccount = () => props.navigation.navigate('CreateAccount');
  const goToLogin = () => props.navigation.navigate('Login');

  return (
    <AuthLayout>
      <AuthButton
        disabled={false}
        onPress={goToCreateAccount}
        text="Create Account"
      />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
