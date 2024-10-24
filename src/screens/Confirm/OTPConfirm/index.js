// import React, { useState, useRef } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import styles from './styles';
// import ArrowLeftButton from '../../../components/ArrowLeftButton/index';
// import FlowerIcon from '../../../../assets/icons/FlowerIcon';
// import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

// const OTPConfirm = ({ route }) => {
//     const { method, verificationId, email } = route.params;
//     const [otp, setOtp] = useState(['', '', '', '', '', '']);
//     const textInputRef = useRef(null);
//     const auth = getAuth();

//     const handleChangeText = (value) => {
//         if (isNaN(value)) return;
//         if (value.length > 6) return; 

//         let val = value + '------'.substr(0, 6 - value.length);
//         setOtp([...val]);
//     };

//     const confirmOTP = async () => {
//         if (method === 'email') {
//             try {
//                 await auth.currentUser.reload();
//                 if (auth.currentUser.emailVerified) {
//                     Alert.alert('Success', 'Email verified!');
//                 } else {
//                     Alert.alert('Error', 'Email verification failed.');
//                 }
//             } catch (error) {
//                 console.error('Error verifying email:', error);
//             }
//         } else if (method === 'phone') {
//             try {
//                 const credential = PhoneAuthProvider.credential(verificationId, otp.join(''));
//                 await signInWithCredential(auth, credential);
//                 Alert.alert('Success', 'Phone number verified!');
//             } catch (error) {
//                 console.error('Error verifying phone OTP:', error);
//             }
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <ArrowLeftButton style={styles.arrowButton} />
//             <FlowerIcon style={styles.flowerIcon} />
//             <Text style={styles.chooseText}>Enter your code</Text>

//             <TouchableOpacity
//                 onPress={() => textInputRef.current.focus()} 
//                 style={styles.otpBoxContainer}
//             >
//                 {otp.map((item, index) => (
//                     <Text style={styles.otpBox} key={index}>
//                         {item}
//                     </Text>
//                 ))}
//                 <TextInput
//                     ref={textInputRef}
//                     onChangeText={handleChangeText}
//                     style={styles.hiddenInput}
//                     keyboardType="numeric"
//                     maxLength={6}
//                     autoFocus={false}
//                 />
//             </TouchableOpacity>

//             <TouchableOpacity onPress={confirmOTP} style={styles.confirmButton}>
//                 <Text style={styles.buttonText}>Confirm OTP</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default OTPConfirm;import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import React, { useState, useRef } from 'react';
import ArrowLeftButton from '../../../components/ArrowLeftButton/index';
import FlowerIcon from '../../../../assets/icons/FlowerIcon';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const OTPConfirm = ({ route }) => {
    const { method, verificationId, email } = route.params || {};
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const textInputRef = useRef(null);
    const auth = getAuth();

    const handleChangeText = (value) => {
        if (isNaN(value)) return;
        if (value.length > 6) return; 

        let val = value + '------'.substr(0, 6 - value.length);
        setOtp([...val]);
    };

    const confirmOTP = async () => {
        if (method === 'email') {
            try {
                await auth.currentUser.reload(); // Reload để kiểm tra email đã xác minh
                if (auth.currentUser.emailVerified) {
                    Alert.alert('Success', 'Email verified!');
                    navigation.navigate('Home'); // Chuyển đến Home nếu thành công
                } else {
                    Alert.alert('Error', 'Email verification failed.');
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                Alert.alert('Error', error.message);
            }
        } else if (method === 'phone') {
            try {
                const credential = PhoneAuthProvider.credential(verificationId, otp.join(''));
                await signInWithCredential(auth, credential);
                Alert.alert('Success', 'Phone number verified!');
                navigation.navigate('Home'); // Chuyển đến Home nếu thành công
            } catch (error) {
                console.error('Error verifying phone OTP:', error);
                Alert.alert('Error', 'Failed to verify phone number. Please try again.');
            }
        }
    };
    
    return (
        <View style={styles.container}>
            <ArrowLeftButton style={styles.arrowButton} />
            <FlowerIcon style={styles.flowerIcon} />
            <Text style={styles.chooseText}>Enter your code</Text>

            <TouchableOpacity
                onPress={() => textInputRef.current.focus()} 
                style={styles.otpBoxContainer}
            >
                {otp.map((item, index) => (
                    <Text style={styles.otpBox} key={index}>
                        {item}
                    </Text>
                ))}
                <TextInput
                    ref={textInputRef}
                    onChangeText={handleChangeText}
                    style={styles.hiddenInput}
                    keyboardType="numeric"
                    maxLength={6}
                    autoFocus={false}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={confirmOTP} style={styles.confirmButton}>
                <Text style={styles.buttonText}>Confirm OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OTPConfirm;
