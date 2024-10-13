// src/navigation/main/index.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/Auth/Login/index';
import SignUpScreen from '../../screens/Auth/SignUp/index';
import RecordingScreen from '../../screens/Video/RecordingScreen/index';
import ConfirmationScreen from '../../screens/Video/ConfirmationScreen/index';
import AddCaptionScreen from '../../screens/Video/AddCaptionScreen/index';
import MethodConfirmScreen from '../../screens/Confirm/MethodConfirm/index';
import OTPConfirmScreen from '../../screens/Confirm/OTPConfirm/index';
import WelcomeScreen from '../../screens/Auth/Welcome/index';
import HomeScreen from '../../screens/Home/HomeScreen/index';

const Stack = createStackNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
                     <Stack.Screen name="Home" component={HomeScreen} /> 
            {/* <Stack.Screen name="Welcome" component={WelcomeScreen} />  */}
            {/* <Stack.Screen name="MethodConfirm" component={MethodConfirmScreen} />
            <Stack.Screen name="OTPConfirm" component={OTPConfirmScreen} /> */}
            {/* <Stack.Screen name="Recording" component={RecordingScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
            <Stack.Screen name="AddCaption" component={AddCaptionScreen} /> */}
        </Stack.Navigator>
    );
};

export default MainNavigation;
