import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import styles from './styles'; 

const DoneButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Svg width="80" height="80" viewBox="0 0 80 80">
            
                <Circle cx="40" cy="40" r="30" fill="#738F81" />
           
                <Circle cx="40" cy="40" r="25" fill="#FFFFFF" />
                    <Path 
                    d="M13.927 27.4167L4.44788 17.9376L7.72913 14.6563L13.927 20.8542L27.2708 7.5105L30.552 10.7917L13.927 27.4167Z" 
                    fill="#738F81"
                    transform="translate(22, 22.5)"
                    />

                
            </Svg>
        </TouchableOpacity>
    );
};

export default DoneButton;
