import React, { RefObject, useEffect, useRef } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';
import { TextInput } from '../components/auth/AuthShared';
import { useForm } from 'react-hook-form';

export default function CreateAccount(
  props: StackScreenProps<RootStackParamList, 'CreateAccount'>,
) {
  const { register, handleSubmit, setValue } = useForm();

  const lastNameRef: React.MutableRefObject<null> = useRef(null);
  const usernameRef: React.MutableRefObject<null> = useRef(null);
  const emailRef: React.MutableRefObject<null> = useRef(null);
  const passwordRef: React.MutableRefObject<null> = useRef(null);

  const onNext = (nextOne: RefObject<HTMLInputElement>): void => {
    nextOne?.current?.focus();
  };

  const onValid = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    register('firstname', {
      required: true,
    });
    register('lastname', {
      required: true,
    });
    register('username', {
      required: true,
    });
    register('email', {
      required: true,
    });
    register('password', {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => setValue('firstname', text)}
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue('lastname', text)}
      />
      <TextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue('username', text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue('email', text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue('password', text)}
        lastOne={true}
      />
      <AuthButton
        disabled={false}
        onPress={handleSubmit(onValid)}
        text="Create Account"
      />
    </AuthLayout>
  );
}
