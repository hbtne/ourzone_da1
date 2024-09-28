import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'; 
import { useFonts } from 'expo-font';
import profileScreen from './src/screens/profileScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
    OpenSansSemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf')
  });

 
  return (
    
      <NavigationContainer >
      
          <StatusBar />
          <GestureHandlerRootView>
            <Stack.Navigator initialRouteName="profileScreen" > 
              <Stack.Screen name="profileScreen" component={profileScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </GestureHandlerRootView>
     
      </NavigationContainer>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
