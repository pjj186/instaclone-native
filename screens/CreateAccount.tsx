import React, { RefObject, useEffect, useRef } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';
import { TextInput } from '../components/auth/AuthShared';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

interface ICreateAccountResult {
  createAccount: {
    ok: boolean;
    error: string;
  };
}

interface ICreateAccountForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount(
  props: StackScreenProps<RootStackParamList, 'CreateAccount'>,
) {
  const { register, handleSubmit, setValue, getValues } =
    useForm<ICreateAccountForm>();

  const onCompleted = (data: ICreateAccountResult) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    if (ok) {
      props.navigation.navigate('Login', {
        username,
        password,
      });
    }
  };

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    },
  );

  const lastNameRef: React.MutableRefObject<null> = useRef(null);
  const usernameRef: React.MutableRefObject<null> = useRef(null);
  const emailRef: React.MutableRefObject<null> = useRef(null);
  const passwordRef: React.MutableRefObject<null> = useRef(null);

  const onNext = (nextOne: RefObject<HTMLInputElement>): void => {
    nextOne?.current?.focus();
  };

  const onValid = (data: ICreateAccountForm) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register('firstName', {
      required: true,
    });
    register('lastName', {
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
        onChangeText={(text) => setValue('firstName', text)}
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue('lastName', text)}
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
