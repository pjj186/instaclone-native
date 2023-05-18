import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { NavStackParamList } from '../navigators/SharedStackNav';
import { gql, useQuery } from '@apollo/client';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';

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

  const { data } = useQuery(FEED_QUERY);

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Feed</Text>
    </View>
  );
}
