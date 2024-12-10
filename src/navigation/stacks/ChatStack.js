import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen from '../../screens/Chat/MessagesScreen';
import ChatScreen from '../../screens/Chat/ChatScreen';

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
  );
};

export default ChatStack;
