import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';
import WelcomeBackground from '../../../../assets/images/WelcomeBackground.png'; 
import LeafIcon from '../../../../assets/icons/LeafIcon';

const Welcome = () => {
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
                    {/* Chữ ne với stroke trắng */}
                    <View style={styles.strokeContainer}>
                        <Text style={styles.logoStrokeTextZone}>ne</Text>
                        <Text style={styles.logoMainText}>ne</Text>
                    </View>
                    
                </View>
            </View>

            <TouchableOpacity style={styles.buttonSignUp}>
                <Text style={styles.buttonTextSignUp}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSignIn}>
                <Text style={styles.buttonTextSignIn}>SIGN IN</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default Welcome;
