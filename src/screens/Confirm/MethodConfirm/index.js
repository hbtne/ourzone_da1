// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import styles from './styles';
// import ArrowLeftButton from '../../../components/ArrowLeftButton/index';
// import FlowerIcon from '../../../../assets/icons/FlowerIcon';
// import ArrowRightButton from '../../../components/ArrowRightButton/index';
// import { useNavigation } from '@react-navigation/native';
// import { getAuth, sendEmailVerification, PhoneAuthProvider } from 'firebase/auth';

// const MethodConfirm = ({ route }) => {
//     const { email, phone } = route.params; 
//     const navigation = useNavigation();
//     const auth = getAuth();

//     const sendOTP = async (method) => {
//         if (method === 'email') {
//             try {
//                 await sendEmailVerification(auth.currentUser);
//                 navigation.navigate('OTPConfirm', { method, email });
//             } catch (error) {
//                 console.error('Error sending email verification:', error);
//             }
//         } else if (method === 'phone') {
//             try {
//                 const phoneProvider = new PhoneAuthProvider(auth);
//                 const verificationId = await phoneProvider.verifyPhoneNumber(phone, recaptchaVerifier);
//                 navigation.navigate('OTPConfirm', { method, verificationId });
//             } catch (error) {
//                 console.error('Error sending phone OTP:', error);
//             }
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <ArrowLeftButton style={styles.arrowButton} />
//             <FlowerIcon style={styles.flowerIcon} />
//             <Text style={styles.chooseText}>Choose one way to receive your code</Text>
//             <TouchableOpacity style={styles.button} onPress={() => sendOTP('email')}>
//                 <Text style={styles.buttonText}>Email</Text>
//                 <ArrowRightButton />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={() => sendOTP('phone')}>
//                 <Text style={styles.buttonText}>Phone Number</Text>
//                 <ArrowRightButton />
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default MethodConfirm;
// screens/Confirm/MethodConfirm/index.js
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { PhoneAuthProvider } from 'firebase/auth'; // Chỉ cần import PhoneAuthProvider
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'; 
import styles from './styles'; 
import FlowerIcon from '../../../../assets/icons/FlowerIcon';

import ArrowLeftButton from '../../../components/ArrowLeftButton/index';
import ArrowRightButton from '../../../components/ArrowRightButton/index';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../../firebase/firebase'; // Import auth từ firebase.js

const MethodConfirm = ({ route }) => {
  const navigation = useNavigation();
  const recaptchaVerifier = useRef(null); 
  const { email, phone } = route.params || {};

  const sendOTP = async (method) => {
    if (method === 'phone') {
      try {
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          {
            phoneNumber: phone,
            recaptchaVerifier: recaptchaVerifier.current, // Sửa lại tham số
          }
        );
        navigation.navigate('OTPConfirm', { method, verificationId });
      } catch (error) {
        console.error('Error sending phone OTP:', error);
        Alert.alert('Error', error.message);
      }
    } else if (method === 'email') {
      try {
        await auth.sendSignInLinkToEmail(email, {
            url: 'ourzone://login', // Thay thế với URL của bạn để chuyển hướng tới màn hình đăng nhập
            handleCodeInApp: true,
          });
          
        
        await AsyncStorage.setItem('emailForSignIn', email);

        Alert.alert('Email sent!', 'Check your email for the verification link.');
      } catch (error) {
        console.error('Error sending email OTP:', error);
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ArrowLeftButton style={styles.arrowButton} />
      <FlowerIcon style={styles.flowerIcon} />

      <Text style={styles.chooseText}>Chọn cách nhận mã xác thực của bạn</Text>
      <TouchableOpacity style={styles.button} onPress={() => sendOTP('email')}>
        <Text style={styles.buttonText}>Email</Text>
        <ArrowRightButton />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => sendOTP('phone')}>
        <Text style={styles.buttonText}>Số điện thoại</Text>
        <ArrowRightButton />
      </TouchableOpacity>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options} // Đảm bảo sử dụng auth đã được khởi tạo
      />
    </View>
  );
};

export default MethodConfirm;
