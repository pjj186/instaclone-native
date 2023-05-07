import React from 'react';
import { TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
`;

const Logo = styled.Image`
  max-width: 100%;
  height: 170px;
`;

const CreateAccount = styled.View`
  background-color: ${(props) => props.theme.accent};
  padding: 5px 10px;
  border-radius: 5px;
`;
const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const LoginLink = styled.Text`
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  margin-top: 10px;
`;

export default function Welcome(
  props: StackScreenProps<RootStackParamList, 'Welcome'>,
) {
  const goToCreateAccount = () => props.navigation.navigate('CreateAccount');
  const goToLogin = () => props.navigation.navigate('Login');

  return (
    <Container>
      <Logo resizeMode="contain" source={require('../assets/logo.png')} />
      <TouchableOpacity onPress={goToCreateAccount}>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
