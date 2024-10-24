// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
// import styles from './styles';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { signup } from '../../../redux/actions/auth'; 

// const SignUpScreen = () => {
//     const [name, setName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
    
//     const navigation = useNavigation();
//     const dispatch = useDispatch();

//     const handleTermsOfServicePress = () => {
//         console.log('Terms of Service clicked');
//     };

//     const handlePrivacyPolicyPress = () => {
//         console.log('Privacy Policy clicked');
//     };
//     const handleSignUp = () => {
//         if (name && phone && email && password && confirmPassword) {
//             if (password === confirmPassword) {
//                 const phonePattern = /^[0-9]{10,}$/;
//                 if (!phonePattern.test(phone)) {
//                     Alert.alert('Error', 'Vui lòng nhập số điện thoại hợp lệ.');
//                     return;
//                 }
    
//                 const userData = { email, name, phone };
    
//                 dispatch(signup(email, password, userData, selectedMethod)) // selectedMethod is 'email' or 'phone'
//                     .then(() => {
//                         navigation.navigate('ConfirmStack', { screen: 'OtpInput', method: selectedMethod });
//                     })
//                     .catch((error) => {
//                         console.error('Sign-up unsuccessful:', error);
//                     });
//             } else {
//                 Alert.alert('Error', 'Mật khẩu không khớp.');
//             }
//         } else {
//             Alert.alert('Error', 'Vui lòng điền đầy đủ thông tin.');
//         }
//     };
    
//     // const handleSignUp = () => {
//     //     if (name && phone && email && password && confirmPassword) {
//     //         if (password === confirmPassword) {
//     //             const phonePattern = /^[0-9]{10,}$/;
//     //             if (!phonePattern.test(phone)) {
//     //                 Alert.alert('Error', 'Vui lòng nhập số điện thoại hợp lệ.');
//     //                 return;
//     //             }
                
//     //             const userData = {
//     //                 email,
//     //                 name,
//     //                 phone,
//     //             };
    
//     //             dispatch(signup(email, password, userData))
//     //                 .then(() => {
//     //                     navigation.navigate('ConfirmStack', { screen: 'MethodConfirmation' })                    })
//     //                 .catch((error) => {
//     //                     console.error('Sign-up unsuccessful:', error);
//     //                 });
//     //         } else {
//     //             Alert.alert('Error', 'Mật khẩu không khớp.');
//     //         }
//     //     } else {
//     //         Alert.alert('Error', 'Vui lòng điền đầy đủ thông tin.');
//     //     }
//     // };
    
    
    

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Sign up</Text>
//             <View style={styles.rectangle}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Name"
//                     value={name}
//                     placeholderTextColor="#FFFFFF"
//                     onChangeText={setName}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Number Phone"
//                     value={phone}
//                     placeholderTextColor="#FFFFFF"
//                     onChangeText={setPhone}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Email Address"
//                     value={email}
//                     placeholderTextColor="#FFFFFF"
//                     onChangeText={setEmail}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Password"
//                     secureTextEntry
//                     value={password}
//                     placeholderTextColor="#FFFFFF"
//                     onChangeText={setPassword}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Confirm Password"
//                     secureTextEntry
//                     value={confirmPassword}
//                     placeholderTextColor="#FFFFFF"
//                     onChangeText={setConfirmPassword}
//                 />
//                 <View style={styles.confirmationContainer}>
//                     <Text style={styles.confirmationText}>
//                         By signing up, you confirm that you’ve read and accepted our{' '}
//                         <Text onPress={handleTermsOfServicePress} style={styles.link}>Terms of Service</Text>
//                         {' '}and{' '}
//                         <Text onPress={handlePrivacyPolicyPress} style={styles.link}>Privacy Policy</Text>.
//                     </Text>
//                 </View>
//             </View>
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={styles.buttonCancel} onPress={() => Alert.alert('Cancel')}>
//                     <Text style={styles.buttonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.buttonLogin} onPress={handleSignUp}>
//                     <Text style={styles.buttonText}>Sign up</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.footer}>
//                 <Text style={styles.footerText}>Already have an account?</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}>
//                     <Text style={styles.footerLink}>Login</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// export default SignUpScreen;
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signup } from '../../../redux/actions/auth';
import { getAuth, sendEmailVerification, PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth'; // Kiểm tra xem đã import đúng


const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleTermsOfServicePress = () => {
        console.log('Terms of Service clicked');
    };

    const handlePrivacyPolicyPress = () => {
        console.log('Privacy Policy clicked');
    };
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSignUp = () => {
        if (!name || !phone || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }
    
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Mật khẩu không khớp.');
            return;
        }
    
        const phonePattern = /^[0-9]{10,}$/;
        if (!phonePattern.test(phone)) {
            Alert.alert('Error', 'Vui lòng nhập số điện thoại hợp lệ.');
            return;
        }
    
        if (password.length < 6) {
            Alert.alert('Error', 'Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }
    
        const userData = { email, name, phone };
    
        dispatch(signup(email, password, userData))
            .then(() => {
                // Sau khi đăng ký thành công, điều hướng tới màn hình chọn phương thức xác thực
                navigation.navigate('ConfirmStack', {
                    screen: 'MethodConfirmation', // Chọn phương thức
                    params: { email, phone }, // Truyền email và phone qua
                });
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert(
                        'Email đã tồn tại',
                        'Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập.',
                        [{ text: 'Đăng nhập', onPress: () => navigation.navigate('LoginScreen') }]
                    );
                } else {
                    Alert.alert('Error', error.message);
                }
            });
            
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
                 <TouchableOpacity onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}>
                     <Text style={styles.footerLink}>Login</Text>
                 </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUpScreen;
