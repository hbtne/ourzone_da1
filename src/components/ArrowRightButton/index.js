
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import styles from './styles';

const ArrowRightButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} > 
            <Svg width="33" height="32" viewBox="0 0 33 32" fill="none">
                <Path d="M13.75 25.0667L23.1 16L13.75 6.93335L10.725 9.86668L17.05 16L10.725 22.1333L13.75 25.0667Z" fill="white" />
            </Svg>
        </TouchableOpacity>
    );
};

export default ArrowRightButton;
