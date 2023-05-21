import React, { ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface IScreenLayoutProps {
  loading: boolean;
  children: ReactNode;
}

export default function ScreenLayout(props: IScreenLayoutProps) {
  const { loading, children } = props;
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
