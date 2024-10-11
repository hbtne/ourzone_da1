import React, { useState, useRef, useEffect } from 'react';
import { SvgXml } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ProfileScreen from './src/screens/profileScreen';
import ChangeNameScreen from './src/screens/changeInfor/changeNameScreen';
import ChangeMailScreen from './src/screens/changeInfor/changeEmail';
import ChangePhoneNum from './src/screens/changeInfor/changePhonenum';
import ChangePassScreen from './src/screens/changeInfor/changePassScreen';
import ChatListScreen from './src/screens/chatBot/chatListScreen';
import OthersProfileScreen from './src/screens/othersProfileScreen.js';



import botLeaf from './assets/icons/botLeaf-icon.js';
import botHeart from './assets/icons/botHeart-icon.js';
import botPerson from './assets/icons/botPeron-icon.js';
import botAdd from './assets/icons/botAdd-icon.js';
import botSearch from './assets/icons/botSearch-icon.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AnimatedIcon = React.memo(({ xml, focused, size, isActive }) => {
  const iconRef = useRef(null);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    iconRef.current?.animate({
      0: { scale: isActive ? 1.5 : 0.5, rotate: '0deg' },
      1: { scale: isActive ? 2 : 1.5, rotate: '360deg' }
    });
  }, [focused, pressed, isActive]);

  return (
    <TouchableOpacity
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={styles.icon}
    >
      <Animatable.View ref={iconRef} duration={1000}>
        <SvgXml xml={xml} width={size} height={size} />
      </Animatable.View>
    </TouchableOpacity>
  );
});


const tabScreens = [
  { name: 'Home', component: ChangeNameScreen, icon: botLeaf },
  { name: 'Search', component: ChangeMailScreen, icon: botSearch },
  { name: 'Add', component: ChangePhoneNum, icon: botAdd },
  { name: 'Favorite', component: ChangePassScreen, icon: botHeart },
  { name: 'profileScreen', component: ProfileScreen, icon: botPerson },
];

// Bottom Tab Navigator
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          size = 20;
          const tab = tabScreens.find(tab => tab.name === route.name);
          return <AnimatedIcon xml={tab.icon} focused={focused} size={size} isActive={focused} />;
        },
        tabBarStyle: { backgroundColor: '#000' },
        tabBarShowLabel: false,
      })}
    >
      {tabScreens.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{ headerShown: false }}
        />
      ))}
    </Tab.Navigator>
  );
}
export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
    OpenSansSemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator initialRouteName="OthersProfileScreen">
          <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ChangeNameScreen" component={ChangeNameScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChangeMailScreen" component={ChangeMailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePhoneNum" component={ChangePhoneNum} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassScreen" component={ChangePassScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChatListScreen" component={ChatListScreen} options={{ headerShown: false }} />
          <Stack.Screen name= "OthersProfileScreen" component={OthersProfileScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 