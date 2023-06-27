import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { NavStackParamList } from '../navigators/SharedStackNav';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import { useForm } from 'react-hook-form';
import { gql, useLazyQuery } from '@apollo/client';

interface ISearchBoxForm {
  keyword: string;
}

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!, $page: Int!) {
    searchPhotos(keyword: $keyword, page: $page) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput``;

export default function Search({
  navigation,
}: StackScreenProps<NavStackParamList, 'Search'>) {
  const { setValue, register, handleSubmit } = useForm<ISearchBoxForm>();

  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);

  const onValid = ({ keyword }: ISearchBoxForm) => {
    console.log(keyword);
    startQueryFn({
      variables: {
        keyword,
        page: 1,
      },
    });
  };

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
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register('keyword', {
      required: true,
    });
  }, []);

  console.log(data);

  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}
      >
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size='large' />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined && data?.searchPhotos.length === 0 ? (
          <MessageContainer>
            <MessageText>Could not find anything</MessageText>
          </MessageContainer>
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
