import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface ITabIcon {
  iconName: keyof typeof Ionicons.glyphMap | undefined;

  color: string;
  focused: boolean;
}

export default function TabIcon(props: ITabIcon) {
  const { iconName, color, focused } = props;
  return (
    <Ionicons
      name={
        focused
          ? iconName
          : (`${iconName}-outline` as keyof typeof Ionicons.glyphMap)
      }
      color={color}
      size={22}
    />
  );
}
