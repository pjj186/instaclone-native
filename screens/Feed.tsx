import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { NavStackParamList } from '../navigators/SharedStackNav';
import { gql, useQuery } from '@apollo/client';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';

interface ISeeFeedResult {
  seeFeed: IPhoto[];
}

interface IPhoto {
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

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed(
  props: StackScreenProps<NavStackParamList, 'Feed'>,
) {
  const { navigation } = props;

  const { data, loading } = useQuery<ISeeFeedResult>(FEED_QUERY);

  const renderPhoto: ListRenderItem<IPhoto> = ({ item: photo }) => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>{photo.caption}</Text>
      </View>
    );
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeFeed}
        renderItem={renderPhoto}
        keyExtractor={(photo) => String(photo.id)}
      />
    </ScreenLayout>
  );
}
