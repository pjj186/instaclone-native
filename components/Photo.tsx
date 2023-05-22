import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { NavStackParamList } from '../navigators/SharedStackNav';

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

interface IUser {
  avatar: string;
  username: string;
  __typename: string;
}

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
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;
const CaptionText = styled.Text`
  color: white;
`;
const Likes = styled.Text`
  color: white;
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

  return (
    <Container>
      <Header onPress={() => navigation.navigate('Profile')}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{
          width: Swidth,
          height: imageHeight,
        }}
        source={{ uri: file }}
      />
      <Actions>
        <Action />
        <Action />
      </Actions>
      <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
      <Caption>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Username>{user.username}</Username>
        </TouchableOpacity>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  );
}
