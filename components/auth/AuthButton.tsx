import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

interface IAuthButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled: boolean;
  text: string;
}

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.accent};
  padding: 15px 10px;
  border-radius: 5px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

export default function AuthButton({
  onPress,
  text,
  loading,
  disabled,
}: IAuthButtonProps) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
