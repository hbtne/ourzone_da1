// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
// import styles from './styles';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { login } from '../../../redux/actions/auth'; 
// import HidePasswordIcon from '../../../../assets/icons/HidePasswordIcon';
// const LoginScreen = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();
//     const navigation = useNavigation(); // Khai báo navigation

//     const handleLogin = () => {
//         if (username && password) {
//             dispatch(login(username, password))
//                 .then(() => {
//                     console.log('login successful');
//                     navigation.navigate('Tabs', { screen: 'Home' });
//                 })
//                 .catch(() => {
//                     console.log('login unsuccessful');
//                     Alert.alert('Lỗi', 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
//                 });
//         } else {
//             Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập và mật khẩu.');
//         }
//     };

//     const handleCancel = () => {
//         setUsername('');
//         setPassword('');
//     };

//     const [isChecked, setIsChecked] = useState(false);

//     const handleCheckboxPress = () => {
//         setIsChecked(!isChecked);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Welcome back!</Text>
//             <View style={styles.rectangle}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Number Phone/Email Address"
//                     value={username}
//                     placeholderTextColor="#FFFFFF"
//                     onChangeText={setUsername}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Password"
//                     secureTextEntry
//                     value={password}
//                     placeholderTextColor="#FFFFFF"
//                     onChangeText={setPassword}
                    
//                 >
//                 <HidePasswordIcon></HidePasswordIcon>
//                 </TextInput>
//                 <View style={styles.checkboxContainer}>
//                     <TouchableOpacity onPress={handleCheckboxPress} style={styles.checkbox}>
//                         {isChecked && <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />}
//                     </TouchableOpacity>
//                     <Text style={styles.label}>Remember Me</Text>
//                 </View>
//                 <TouchableOpacity>
//                     <Text style={styles.forgotPassword}>Forgot Password?</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
//                     <Text style={styles.buttonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
//                     <Text style={styles.buttonText}>Login</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.footer}>
//                 <Text style={styles.footerText}>Don’t have an account?</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('AuthStack', { screen: 'SignUp' })}>
//                     <Text style={styles.footerLink}>Sign up</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// export default LoginScreen;
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/actions/auth';
import HidePasswordIcon from '../../../../assets/icons/HidePasswordIcon';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordHidden, setIsPasswordHidden] = useState(true); // Trạng thái hiển thị mật khẩu
    const [isChecked, setIsChecked] = useState(false); // Trạng thái Remember Me

    const dispatch = useDispatch();
    const navigation = useNavigation();

    // Xử lý đăng nhập
    const handleLogin = () => {
        if (username && password) {
            dispatch(login(username, password))
                .then(async () => {
                    console.log('Login successful');
                    if (isChecked) {
                        await AsyncStorage.setItem('userInfo', JSON.stringify({ username, password }));
                    } else {
                        await AsyncStorage.removeItem('userInfo');
                    }
                    navigation.navigate('Tabs', { screen: 'Home' });
                })
                .catch(() => {
                    console.log('Login unsuccessful');
                    Alert.alert('Error', 'Login failed. Please check your credentials.');
                });
        } else {
            Alert.alert('Error', 'Please enter both username and password.');
        }
    };

    // Xóa thông tin đăng nhập
    const handleCancel = () => {
        setUsername('');
        setPassword('');
    };

    // Xử lý Remember Me
    const handleCheckboxPress = () => {
        setIsChecked(!isChecked);
    };

    // Chuyển đổi trạng thái hiển thị mật khẩu
    const togglePasswordVisibility = () => {
        setIsPasswordHidden(!isPasswordHidden);
    };

    // Lấy thông tin đăng nhập từ AsyncStorage
    React.useEffect(() => {
        const loadUserInfo = async () => {
            const savedUserInfo = await AsyncStorage.getItem('userInfo');
            if (savedUserInfo) {
                const { username, password } = JSON.parse(savedUserInfo);
                setUsername(username);
                setPassword(password);
                setIsChecked(true);
            }
        };
        loadUserInfo();
    }, []);

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
             <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, styles.passwordInput]} // Kết hợp style
                    placeholder="Password"
                    secureTextEntry={isPasswordHidden}
                    value={password}
                    placeholderTextColor="#FFFFFF"
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                    <HidePasswordIcon color={isPasswordHidden ? '16412C' : '#FFFFFF'} />
                </TouchableOpacity>
            </View>

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={handleCheckboxPress} style={styles.checkbox}>
                        {isChecked && <View style={styles.checkboxTick} />}
                    </TouchableOpacity>
                    <Text style={styles.label}>Remember Me</Text>
                    <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                </View>
              
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
