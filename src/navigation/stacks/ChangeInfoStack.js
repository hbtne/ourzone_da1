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
      <Stack.Screen name="ChangeNameScreen" component={ChangeNameScreen} />
      <Stack.Screen name="ChangeMailScreen" component={ChangeMailScreen} />
      <Stack.Screen name="ChangePhoneNum" component={ChangePhoneNum} />
      <Stack.Screen name="ChangePassScreen" component={ChangePassScreen} />
    </Stack.Navigator>
  );
};

export default ChangeInfoStack;
