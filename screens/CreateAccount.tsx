import React from 'react';
import { View, Text } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;

export default function CreateAccount(
  props: StackScreenProps<RootStackParamList, 'CreateAccount'>,
) {
  return (
    <Container>
      <Text>CreateAccount</Text>
    </Container>
  );
}
