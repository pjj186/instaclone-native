import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { NavStackParamList } from '../navigators/SharedStackNav';
import { Ionicons } from '@expo/vector-icons';
import {
  ApolloCache,
  NormalizedCacheObject,
  gql,
  useMutation,
} from '@apollo/client';

export interface IPhoto {
  caption: string;
  commentNumber: number;
  comments: IComment[];
  createdAt: string;
  file: string;
  id: number;
  isLiked: boolean;
  isMine: boolean;
  likes: number;
  user: IUser;
  __typename: string;
}

interface IComment {
  createdAt: string;
  id: number;
  isMine: boolean;
  user: IUser;
  __typename: string;
}

export interface IUser {
  id: number;
  avatar: string;
  username: string;
  isFollowing: boolean;
  isMe: boolean;
  __typename: string;
}

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLiked($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.View``;

const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

const Username = styled.Text`
  color: white;
  font-weight: 600;
`;

const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;

const ExtraContainer = styled.View`
  padding: 10px;
`;

export default function Photo(props: IPhoto) {
  const { id, user, caption, file, isLiked, likes } = props;

  const navigation = useNavigation<StackNavigationProp<NavStackParamList>>();

  const { width: Swidth, height } = useWindowDimensions();

  const [imageHeight, setImageHeight] = useState(height - 450);

  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight((height * Swidth) / width);
    });
  }, [file]);

  const updateToggleLike = (
    cache: ApolloCache<NormalizedCacheObject>,
    result: any,
  ) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    // update : mutation이 완료된 후 Apollo 클라이언트 캐시를 업데이트 하는데 사용되는 기능
    update: updateToggleLike,
  });

  const goToProfile = () => {
    navigation.navigate('Profile', {
      username: user.username,
      id: user.id,
    });
  };

  return (
    <Container>
      <Header onPress={goToProfile}>
        <UserAvatar resizeMode='cover' source={{ uri: user.avatar }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode='cover'
        style={{
          width: Swidth,
          height: imageHeight,
        }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <Action onPress={() => toggleLikeMutation()}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              color={isLiked ? 'tomato' : 'white'}
              size={22}
            />
          </Action>
          <Action
            onPress={() => {
              navigation.navigate('Comments');
            }}
          >
            <Ionicons name='chatbubble-outline' color='white' size={22} />
          </Action>
        </Actions>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Likes', {
              photoId: id,
            })
          }
        >
          <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={goToProfile}>
            <Username>{user.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
}
