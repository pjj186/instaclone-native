import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { NavStackParamList } from '../navigators/SharedStackNav';
import { gql, useQuery } from '@apollo/client';
import { PHOTO_FRAGMENT } from '../fragments';
import Photo from '../components/Photo';
import ScreenLayout from '../components/ScreenLayout';

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`;

export default function PhotoScreen(
  props: StackScreenProps<NavStackParamList, 'Photo'>,
) {
  const { navigation, route } = props;

  const { data, loading, refetch } = useQuery(SEE_PHOTO, {
    variables: {
      id: route.params.photoId,
    },
  });

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // 당겨서 새로고침을 하기위해 ScrollView 사용
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{
          backgroundColor: 'black',
        }}
        contentContainerStyle={{
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Photo {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  );
}
