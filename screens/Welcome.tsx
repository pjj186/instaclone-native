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
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 100%;
  height: 150px;
`;

const CreateAccount = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.accent};
  padding: 13px 10px;
  border-radius: 5px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

const LoginLink = styled.Text`
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  margin-top: 20px;
`;

export default function Welcome(
  props: StackScreenProps<RootStackParamList, 'Welcome'>,
) {
  const goToCreateAccount = () => props.navigation.navigate('CreateAccount');
  const goToLogin = () => props.navigation.navigate('Login');

  return (
    <Container>
      <Logo resizeMode="contain" source={require('../assets/logo.png')} />
      <CreateAccount disabled={false} onPress={goToCreateAccount}>
        <CreateAccountText>Create Account</CreateAccountText>
      </CreateAccount>
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
