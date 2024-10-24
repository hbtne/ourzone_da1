import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChangeNameScreen from '../../screens/changeInfor/changeNameScreen';
import ChangeMailScreen from '../../screens/changeInfor/changeEmail';
import ChangePhoneNum from '../../screens/changeInfor/changePhonenum';
import ChangePassScreen from '../../screens/changeInfor/changePassScreen';

const Stack = createStackNavigator();

const ChangeInfoStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChangeName" component={ChangeNameScreen} />
      <Stack.Screen name="ChangeEmail" component={ChangeMailScreen} />
      <Stack.Screen name="ChangePhoneNum" component={ChangePhoneNum} />
      <Stack.Screen name="ChangePassword" component={ChangePassScreen} />
    </Stack.Navigator>
  );
};

export default ChangeInfoStack;
