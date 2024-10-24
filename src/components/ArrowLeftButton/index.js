import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import styles from './styles';

const ArrowLeftButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.goBack()}>
            <Svg width="33" height="32" viewBox="0 0 33 32" fill="none">
                <Path d="M19.25 25.0667L9.90002 16L19.25 6.93335L22.275 9.86668L15.95 16L22.275 22.1333L19.25 25.0667Z" fill="white"/>
            </Svg>
        </TouchableOpacity>
    );
};

export default ArrowLeftButton;
