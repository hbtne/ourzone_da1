import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import styles from './styles';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
    let [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../../assets/fonts/Montserrat-Regular.otf'),
        'Montserrat-Bold': require('../../../../assets/fonts/Montserrat-Bold.otf'),
        'Montserrat-SemiBold': require('../../../../assets/fonts/Montserrat-SemiBold.otf'),
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username && password) {
            Alert.alert('Đăng nhập thành công!', `Xin chào ${username}`);
        } else {
            Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập và mật khẩu.');
        }
    };

    const handleCancel = () => {
        setUsername('');
        setPassword('');
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxPress = () => {
        setIsChecked(!isChecked);
    };
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back!</Text>
            <View style={styles.rectangle}>
                <TextInput
                    style={styles.input}
                    placeholder="Number Phone/Email Address"
                    value={username}
                    placeholderTextColor="#FFFFFF"
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    placeholderTextColor="#FFFFFF"
                    onChangeText={setPassword}
                />
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={handleCheckboxPress} style={styles.checkbox}>
                        {isChecked && <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />}
                    </TouchableOpacity>
                    <Text style={styles.label}>Remember Me</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonCancel} onPress={() => Alert.alert('Cancel')}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don’t have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style={styles.footerLink}>Sign up</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default LoginScreen;
