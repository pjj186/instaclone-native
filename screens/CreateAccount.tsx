import React, { RefObject, useRef } from 'react';
import { TextInput } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';

export default function CreateAccount(
  props: StackScreenProps<RootStackParamList, 'CreateAccount'>,
) {
  const lastNameRef: React.MutableRefObject<null> = useRef(null);
  const usernameRef: React.MutableRefObject<null> = useRef(null);
  const emailRef: React.MutableRefObject<null> = useRef(null);
  const passwordRef: React.MutableRefObject<null> = useRef(null);

  const onNext = (nextOne: RefObject<HTMLInputElement>): void => {
    nextOne?.current?.focus();
  };

  const onDone = () => {
    alert('Done');
  };

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
        onSubmitEditing={() => onNext(lastNameRef)}
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}
        onSubmitEditing={() => onNext(usernameRef)}
      />
      <TextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}
        onSubmitEditing={() => onNext(emailRef)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        returnKeyType="next"
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}
        onSubmitEditing={() => onNext(passwordRef)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        returnKeyType="done"
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}
        onSubmitEditing={onDone}
      />
      <AuthButton
        disabled={true}
        onPress={() => console.log('any')}
        text="Create Account"
      />
    </AuthLayout>
  );
}
