import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';
import WelcomeBackground from '../../../../assets/images/WelcomeBackground.png'; 
import LeafIcon from '../../../../assets/icons/LeafIcon';
import { useNavigation } from '@react-navigation/native'; 


const Welcome = () => {
    const navigation = useNavigation(); 
    return (
        <ImageBackground 
            source={WelcomeBackground} 
            style={styles.backgroundImage}
            resizeMode="cover" 
        >
            <View style={styles.logoContainer}>
                <Text style={styles.logoTextOur}>our</Text>
                <View style={styles.zoneContainer}>
                  
                    <View style={styles.strokeContainer}>
                        <Text style={styles.logoStrokeTextZone}>Z</Text>
                        <Text style={styles.logoMainText}>Z</Text>
                    </View>
                
                    <LeafIcon />
                    <View style={styles.strokeContainer}>
                        <Text style={styles.logoStrokeTextZone}>ne</Text>
                        <Text style={styles.logoMainText}>ne</Text>
                    </View>
                    
                </View>
            </View>

            <TouchableOpacity style={styles.buttonSignUp}  onPress={() => navigation.navigate('AuthStack', { screen: 'SignUp' })}>
                <Text style={styles.buttonTextSignUp}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSignIn} onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })} >
                <Text style={styles.buttonTextSignIn}>SIGN IN</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default Welcome;
