import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

interface IAuthLayoutProps {
  children: ReactNode;
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
`;

export default function AuthLayout({ children }: IAuthLayoutProps) {
  return (
    <Container>
      <Logo resizeMode="contain" source={require('../../assets/logo.png')} />
      {children}
    </Container>
  );
}
