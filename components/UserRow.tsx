import {
  ApolloCache,
  NormalizedCacheObject,
  gql,
  useApolloClient,
  useMutation,
} from '@apollo/client';
import { IUser } from './Photo';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavStackParamList } from '../navigators/SharedStackNav';

interface FollowBtnProps {
  isFollowing?: boolean;
}

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;

const Username = styled.Text`
  font-weight: 600;
  color: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`;
const FollowBtn = styled.TouchableOpacity<FollowBtnProps>`
  background-color: ${(props) =>
    props.isFollowing ? '#DBDBDB' : props.theme.accent};
  padding: 10px 20px;
  border-radius: 5px;
`;
const FollowBtnText = styled.Text<FollowBtnProps>`
  font-weight: 600;
  color: ${(props) => (props.isFollowing ? 'black' : 'white')};
`;

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

export default function UserRow({
  id,
  avatar,
  username,
  isFollowing,
  isMe,
}: IUser) {
  const client = useApolloClient();

  const navigation = useNavigation<StackNavigationProp<NavStackParamList>>();

  const unfollowUserUpdate = (
    cache: ApolloCache<NormalizedCacheObject>,
    result: any,
  ) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
      },
    });
  };

  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: unfollowUserUpdate,
  });

  const followUserCompleted = (data: any) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
      },
    });
  };

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    onCompleted: followUserCompleted,
  });

  return (
    <Wrapper>
      <Column
        onPress={() =>
          navigation.navigate('Profile', {
            username,
            id,
          })
        }
      >
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn
          isFollowing={isFollowing}
          onPress={() => {
            isFollowing ? unfollowUser() : followUser();
          }}
        >
          <FollowBtnText isFollowing={isFollowing}>
            {isFollowing ? '팔로잉' : '팔로우'}
          </FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
}
