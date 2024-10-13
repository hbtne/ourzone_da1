import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import styles from './styles';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    let [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../../assets/fonts/Montserrat-Regular.otf'),
        'Montserrat-Bold': require('../../../../assets/fonts/Montserrat-Bold.otf'),
        'Montserrat-SemiBold': require('../../../../assets/fonts/Montserrat-SemiBold.otf'),
    });

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();
    const handleTermsOfServicePress = () => {
        // Xử lý khi người dùng nhấn vào "Terms of Service"
        console.log('Terms of Service clicked');
    };

    const handlePrivacyPolicyPress = () => {
        // Xử lý khi người dùng nhấn vào "Privacy Policy"
        console.log('Privacy Policy clicked');
    }
    const handleSignUp = () => {
        if (name && phone && email && password && confirmPassword) {
            if (password === confirmPassword) {
                Alert.alert('Đăng ký thành công!', `Xin chào ${name}`);
            } else {
                Alert.alert('Lỗi', 'Mật khẩu không khớp.');
            }
        } else {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
            <View style={styles.rectangle}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    placeholderTextColor="#FFFFFF"
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Number Phone"
                    value={phone}
                    placeholderTextColor="#FFFFFF"
                    onChangeText={setPhone}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    value={email}
                    placeholderTextColor="#FFFFFF"
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    placeholderTextColor="#FFFFFF"
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    placeholderTextColor="#FFFFFF"
                    onChangeText={setConfirmPassword}
                />
                <View style={styles.confirmationContainer}>
                    <Text style={styles.confirmationText}>
                        By signing up, you confirm that you’ve read and accepted our{' '}
                        <Text onPress={handleTermsOfServicePress} style={styles.link}>Terms of Service</Text>
                        {' '}and{' '}
                        <Text onPress={handlePrivacyPolicyPress} style={styles.link}>Privacy Policy</Text>.
                    </Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonCancel} onPress={() => Alert.alert('Cancel')}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogin} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.footerLink}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUpScreen;
