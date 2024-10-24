import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/actions/auth'; 

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation(); // Khai báo navigation

    const handleLogin = () => {
        if (username && password) {
            dispatch(login(username, password))
                .then(() => {
                    console.log('login successful');
                    navigation.navigate('Tabs', { screen: 'Home' });
                })
                .catch(() => {
                    console.log('login unsuccessful');
                    Alert.alert('Lỗi', 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
                });
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
                <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don’t have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AuthStack', { screen: 'SignUp' })}>
                    <Text style={styles.footerLink}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;
