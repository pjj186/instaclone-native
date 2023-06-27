import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { NavStackParamList } from '../navigators/SharedStackNav';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import { useForm } from 'react-hook-form';
import { gql, useLazyQuery } from '@apollo/client';
import { IPhoto } from '../components/Photo';

interface ISearchBoxForm {
  keyword: string;
}

interface InputProps {
  width: number;
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

const Input = styled.TextInput<InputProps>`
  background-color: rgba(255, 255, 255, 1);
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 10px;
`;

export default function Search({
  navigation,
}: StackScreenProps<NavStackParamList, 'Search'>) {
  const numColumns = 4;

  const { width } = useWindowDimensions();

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
    <Input
      width={width}
      placeholderTextColor='rgba(0,0,0,0.8)'
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

  const renderItem: ListRenderItem<IPhoto> = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Photo', {
          photoId: photo.id,
        });
      }}
    >
      <Image
        source={{
          uri: photo.file,
        }}
        style={{
          width: width / numColumns,
          height: 100,
        }}
      />
    </TouchableOpacity>
  );

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
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchPhotos}
              keyExtractor={(photo) => '' + photo.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
