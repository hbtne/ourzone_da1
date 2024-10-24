import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../screens/profileScreen';
import SearchScreen from '../../screens/searchScreen';
import NoticeScreen from '../../screens/noticeScreen';
import AnimatedIcon from '../../../assets/icons/AnimatedIcon';
import HomeScreen from '../../screens/Home/HomeScreen/index'; 
import VideoScreen from '../../screens/Video/RecordingScreen/index';
import botLeaf from '../../../assets/icons/botLeaf-icon';
import botHeart from '../../../assets/icons/botHeart-icon';
import botPerson from '../../../assets/icons/botPeron-icon';
import botAdd from '../../../assets/icons/botAdd-icon';
import botSearch from '../../../assets/icons/botSearch-icon';
import { SvgXml } from 'react-native-svg';

const Tab = createBottomTabNavigator();

const tabScreens = [
    { name: 'Home', component: HomeScreen, icon: botLeaf }, 
    { name: 'Search', component: SearchScreen, icon: botSearch },

    { name: 'Add', component: VideoScreen, icon: botAdd },  
  { name: 'Notice', component: NoticeScreen, icon: botHeart },
  { name: 'Profile', component: ProfileScreen, icon: botPerson },

];

const TabNavigator = () => {
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
        headerShown: false, // This hides the header
      })}
    >
      {tabScreens.map(tab => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
