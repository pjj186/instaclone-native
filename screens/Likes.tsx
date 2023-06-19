import React, { useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavStackParamList } from '../navigators/SharedStackNav';
import { gql, useQuery } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import { IUser } from '../components/Photo';
import UserRow from '../components/UserRow';

type Props = NativeStackScreenProps<NavStackParamList, 'Likes'>;

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default function Likes({ route }: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: {
      id: route?.params?.photoId,
    },
    skip: !route?.params?.photoId, // 쿼리를 스킵하게 하는 역할
  });

  const renderUser: ListRenderItem<IUser> = ({ item: user }) => (
    <UserRow {...user} />
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoLikes}
        keyExtractor={(item) => '' + item.id}
        renderItem={renderUser}
        style={{ width: '100%' }}
      ></FlatList>
    </ScreenLayout>
  );
}
