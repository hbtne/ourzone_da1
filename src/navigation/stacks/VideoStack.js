import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecordingScreen from '../../screens/Video/RecordingScreen/index';
import ConfirmationScreen from '../../screens/Video/ConfirmationScreen/index';
import AddCaptionScreen from '../../screens/Video/AddCaptionScreen/index';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Recording" component={RecordingScreen} />
      
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
            <Stack.Screen name="AddCaption" component={AddCaptionScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
