import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { NavStackParamList } from '../navigators/SharedStackNav';
import { gql, useQuery } from '@apollo/client';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import Photo, { IPhoto } from '../components/Photo';

interface ISeeFeedResult {
  seeFeed: IPhoto[];
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

  const { data, loading, refetch } = useQuery<ISeeFeedResult>(FEED_QUERY);

  const renderPhoto: ListRenderItem<IPhoto> = ({ item: photo }) => {
    return <Photo {...photo} />;
  };

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={refresh}
        style={{
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        renderItem={renderPhoto}
        keyExtractor={(photo) => String(photo.id)}
      />
    </ScreenLayout>
  );
}
