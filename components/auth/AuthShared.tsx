import styled from 'styled-components/native';

interface TextInputProps {
  lastOne?: boolean;
}

export const TextInput = styled.TextInput<TextInputProps>`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  margin-bottom: 8px;
  border-radius: 4px;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: ${(props) => (props.lastOne ? '15' : 8)}px;
`;
