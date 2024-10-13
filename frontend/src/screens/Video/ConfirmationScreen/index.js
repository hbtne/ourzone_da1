import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import FlashIcon from '../../../../assets/icons/FlashIcon';
import DoneButton from '../../../components/DoneButton/index';
import DownloadIcon from '../../../../assets/icons/DownloadIcon';
import BackIcon from '../../../../assets/icons/BackIcon';
import { useNavigation } from '@react-navigation/native';
const ConfirmationScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
           
            <TouchableOpacity style={styles.backIconContainer}>
                <BackIcon />
            </TouchableOpacity>

        

            <View style={styles.footerContainer}>

                <DoneButton  onPress={() => navigation.navigate('AddCaption')} />
     
            </View>
        </View>
    );
};

export default ConfirmationScreen;
