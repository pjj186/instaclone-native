import { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './themes';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import client, { isLoggedInVar, tokenVar } from './apollo';
import LoggedInNav from './navigators/LoggedInNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const preloadAssets = () => {};

  useEffect(() => {
    const preload = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          isLoggedInVar(true);
          tokenVar(token);
        }
        const fontToLoad = [Ionicons.font];
        const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));
        const imagesToLoad = [
          require('./assets/logo.png'),
          'https://raw.githubusercontent.com/nomadcoders/instaclone-native/93a5b77e98eefdf5084bfae44653ba67e4ca312c/assets/logo.png',
        ];
        const imagePromises = imagesToLoad.map((image) =>
          Asset.loadAsync(image),
        );
        await Promise.all([...fontPromises, ...imagePromises]);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };
    preload();
  }, []);

  const hideSplash = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  hideSplash();

  const light = Appearance.getColorScheme() === 'light';

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={light ? lightTheme : darkTheme}>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}
