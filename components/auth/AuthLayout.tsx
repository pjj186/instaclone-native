import React, { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

import styled from 'styled-components/native';

interface IAuthLayoutProps {
  children: ReactNode;
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
  padding: 0px 20px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export default function AuthLayout({ children }: IAuthLayoutProps) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === 'web'}
    >
      <Container>
        <KeyboardAvoidingView
          style={{
            width: '100%',
          }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require('../../assets/logo.png')}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
