import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/profileScreen';
import OthersProfileScreen from '../../screens/othersProfileScreen';
import FollowerScreen from '../../screens/followerScreen';
import FollowingScreen from '../../screens/followingScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="OthersProfile" component={OthersProfileScreen} />
      <Stack.Screen name="FollowerScreen" component={FollowerScreen} />
      <Stack.Screen name="FollowingScreen" component={FollowingScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
