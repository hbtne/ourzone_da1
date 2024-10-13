// App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './frontend/src/navigation/main/index';
import LoginScreen from './frontend/src/screens/Auth/Login/index';
import SignUpScreen from './frontend/src/screens/Auth/SignUp/index'

const App = () => {
    return (
      
            <NavigationContainer>
              <MainNavigation />
            </NavigationContainer>
          
    );
};

export default App;
