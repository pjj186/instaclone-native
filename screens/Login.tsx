import React, { RefObject, useEffect, useRef } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';
import AuthButton from '../components/auth/AuthButton';
import { useForm } from 'react-hook-form';

export default function Login(
  props: StackScreenProps<RootStackParamList, 'Login'>,
) {
  const { register, handleSubmit, setValue } = useForm();

  const passwordRef: React.MutableRefObject<null> = useRef(null);

  const onNext = (nextOne: RefObject<HTMLInputElement>): void => {
    nextOne?.current?.focus();
  };

  const onValid = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    register('username', {
      required: true,
    });
    register('password', {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue('username', text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue('password', text)}
      />
      <AuthButton
        loading={false}
        onPress={handleSubmit(onValid)}
        text="Log in"
      />
    </AuthLayout>
  );
}
