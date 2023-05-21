import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

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

const Header = styled.View``;

const UserAvatar = styled.Image``;

const Username = styled.Text`
  color: white;
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

  const { width, height } = useWindowDimensions();

  return (
    <Container>
      <Header>
        <UserAvatar />
        <Username>{user.username}</Username>
      </Header>
      <File
        style={{
          width,
          height: height - 500,
        }}
        source={{ uri: file }}
      />
      <Actions>
        <Action />
        <Action />
      </Actions>
      <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
      <Caption>
        <Username>{user.username}</Username>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  );
}
