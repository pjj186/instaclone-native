import { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preload = async () => {
      try {
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

  return (
    <NavigationContainer>
      <LoggedOutNav />
    </NavigationContainer>
  );
}
