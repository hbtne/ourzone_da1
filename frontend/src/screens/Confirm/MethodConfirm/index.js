// MethodConfirm.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import ArrowLeftButton from '../../../components/ArrowLeftButton/index';
import FlowerIcon from '../../../../assets/icons/FlowerIcon';
import ArrowRightButton from '../../../components/ArrowRightButton/index';
import { useNavigation } from '@react-navigation/native';


const MethodConfirm = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ArrowLeftButton style={styles.arrowButton} />
            <FlowerIcon  style={styles.flowerIcon}/>
            <Text style={styles.chooseText}>Choose one way to receive your code</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OTPConfirm')}>
                <Text style={styles.buttonText}>Email</Text>
                <ArrowRightButton/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OTPConfirm')}>
                <Text style={styles.buttonText}>Phone Number</Text>
                <ArrowRightButton/>
            </TouchableOpacity>
        </View>
    );
};

export default MethodConfirm;
