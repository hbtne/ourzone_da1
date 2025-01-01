import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from '../tabs/TabNavigator';  // Import TabNavigator
import AuthStack from '../stacks/AuthStack';
import ChangeInfoStack from '../stacks/ChangeInfoStack';
import ProfileStack from '../stacks/ProfileStack';
import VideoStack from '../stacks/VideoStack';
import ConfirmStack from '../stacks/ConfirmStack';
import ChatStack from '../stacks/ChatStack';
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthStack">
      {/* AuthStack as the initial route */}
      <Stack.Screen name="AuthStack" component={AuthStack} />

      {/* Other Stacks */}
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="ChangeInfoStack" component={ChangeInfoStack} />
      <Stack.Screen name="ProfileStack" component={ProfileStack} />
      <Stack.Screen name="VideoStack" component={VideoStack} />
      <Stack.Screen name="ConfirmStack" component={ConfirmStack} />
      <Stack.Screen name="ChatStack" component={ChatStack} />

    </Stack.Navigator>
  );
};

export default MainStack;
