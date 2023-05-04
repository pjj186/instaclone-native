import React from 'react';
import { View, Text } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/LoggedOutNav';

export default function CreateAccount(
  props: StackScreenProps<RootStackParamList, 'CreateAccount'>,
) {
  return (
    <View>
      <Text>CreateAccount</Text>
    </View>
  );
}
