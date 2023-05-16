import React, { RefObject, useEffect, useRef } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';
import AuthButton from '../components/auth/AuthButton';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { isLoggedInVar } from '../apollo';

interface ILoginResult {
  login: {
    __typename: string;
    error: string;
    ok: boolean;
    token: string;
  };
}

interface ILoginForm {
  username: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login(
  props: StackScreenProps<RootStackParamList, 'Login'>,
) {
  const { register, handleSubmit, setValue, watch, getValues } =
    useForm<ILoginForm>();

  const passwordRef: React.MutableRefObject<null> = useRef(null);

  const onCompleted = (data: ILoginResult) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      isLoggedInVar(true);
    }
  };

  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextOne: RefObject<HTMLInputElement>): void => {
    nextOne?.current?.focus();
  };

  const onValid = (data: ILoginForm) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
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
        disabled={!watch('username') || !watch('password')}
        loading={loading}
        onPress={handleSubmit(onValid)}
        text="Log in"
      />
    </AuthLayout>
  );
}
