import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OTPVerificationScreen from '../../screens/Confirm/OTPConfirm/index'; // OTP Verification screen
import MethodConfirmationScreen from '../../screens/Confirm/MethodConfirm/index'; // Method confirmation screen

const Stack = createStackNavigator();

const ConfirmStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="MethodConfirmation" component={MethodConfirmationScreen} />
    </Stack.Navigator>
  );
};

export default ConfirmStack;
