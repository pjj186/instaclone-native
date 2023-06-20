import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Text, TextInput, View } from 'react-native';
import { NavStackParamList } from '../navigators/SharedStackNav';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import { useForm } from 'react-hook-form';

interface ISearchBoxForm {
  keyword: string;
}

const Input = styled.TextInput``;

export default function Search({
  navigation,
}: StackScreenProps<NavStackParamList, 'Search'>) {
  const { setValue, register, watch } = useForm<ISearchBoxForm>();
  const SearchBox = () => (
    <TextInput
      style={{ backgroundColor: 'white' }}
      placeholderTextColor='black'
      placeholder='Search photos'
      autoCapitalize='none'
      returnKeyLabel='Search'
      returnKeyType='search'
      autoCorrect={false}
      onChangeText={(text) => setValue('keyword', text)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register('keyword');
  }, []);

  console.log(watch('keyword'));

  return (
    <DismissKeyboard>
      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Search</Text>
      </View>
    </DismissKeyboard>
  );
}
