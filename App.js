// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/main/MainStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; 
import rootReducer from './src/redux/reducers';
import { app, auth } from './frontend/firebase'; // Import app và auth
import { Linking } from 'react-native';
import { useEffect } from 'react';
const store = configureStore({
  reducer: rootReducer,
});

export default function App() {
  useEffect(() => {
    const handleUrl = (url) => {
      const route = url.replace(/.*?:\/\//g, ''); // Lấy phần sau của URL
      if (route === 'login') {
        navigation.navigate('AuthStack', { screen: 'Login' }); // Điều hướng đến màn hình đăng nhập
      }
    };
    const linkingListener = Linking.addEventListener('url', ({ url }) => handleUrl(url));
  
    return () => {
      linkingListener.remove();
    };
  }, []);
  let [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.otf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.otf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
    'OtomanopeeOne-Regular': require('./assets/fonts/OtomanopeeOne-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
