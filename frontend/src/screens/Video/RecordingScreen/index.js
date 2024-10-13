import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import FlashIcon from '../../../../assets/icons/FlashIcon';
import CameraButton from '../../../components/CameraButton/index';
import DownloadIcon from '../../../../assets/icons/DownloadIcon';
import CancelIcon from '../../../../assets/icons/CancelIcon';
import { useNavigation } from '@react-navigation/native';

const RecordingScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* Biểu tượng Cancel nằm ở góc trái trên màn hình */}
            <TouchableOpacity style={styles.cancelIconContainer}>
                <CancelIcon />
            </TouchableOpacity>

            <Text style={styles.title}>Recording Video Screen</Text>

            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.iconContainer}>
                    <FlashIcon style={styles.rightButton} />
                </TouchableOpacity>
                <CameraButton  onPress={() => navigation.navigate('Confirmation')} />
                <TouchableOpacity style={styles.iconContainer}>
                    <DownloadIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RecordingScreen;
