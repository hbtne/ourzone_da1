// OTPConfirm.js
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import ArrowLeftButton from '../../../components/ArrowLeftButton/index';
import FlowerIcon from '../../../../assets/icons/FlowerIcon';
import ArrowRightButton from '../../../components/ArrowRightButton/index';

const OTPConfirm = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const textInputRef = useRef(null);

    const handleChangeText = (value) => {
        if (isNaN(value)) {
            return;
        }
        if (value.length > 6) {
            return; 
        }
        let val = value + '------'.substr(0, 6 - value.length);
        let a = [...val];
        setOtp(a);
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

            
        </View>
    );
};

export default OTPConfirm;
