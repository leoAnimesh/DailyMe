import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Routes from './src/screens/Routes';
import React from 'react';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { FONTS } from './src/constants/GlobalTheme';
import store, { persistor } from './src/app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: FONTS.background,
    },
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
}
