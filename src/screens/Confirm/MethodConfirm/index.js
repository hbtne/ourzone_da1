import React, { useRef } from 'react';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { PhoneAuthProvider } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import FlowerIcon from '../../../../assets/icons/FlowerIcon';
import ArrowLeftButton from '../../../components/ArrowLeftButton/index';
import ArrowRightButton from '../../../components/ArrowRightButton/index';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../../firebase/firebase';

const MethodConfirm = ({ route }) => {
  const navigation = useNavigation();
  const recaptchaVerifier = useRef(null);
  const { email} = route.params;

  const actionCodeSettings = {
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios',
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12',
    },
    dynamicLinkDomain: 'ourzone-d56f1.page.link',
  };

  const sendEmailOTP = async (email) => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      await AsyncStorage.setItem('emailForSignIn', email);

      Alert.alert('Success', 'Đường dẫn xác minh đã được gửi qua email.');
    } catch (error) {
      console.error('Error sending email OTP:', error);
      Alert.alert('Error', 'Không thể gửi email xác minh. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <ArrowLeftButton style={styles.arrowButton} />
      <FlowerIcon style={styles.flowerIcon} />

      <Text style={styles.chooseText}>Chọn cách nhận mã xác thực của bạn</Text>
      <TouchableOpacity style={styles.button} onPress={() => sendEmailOTP(email)}>
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
