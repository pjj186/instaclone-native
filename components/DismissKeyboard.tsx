import React, { ReactNode } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

interface IDismisskeyboardProps {
  children: ReactNode;
}

export default function DismissKeyboard({ children }: IDismisskeyboardProps) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === 'web'}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
