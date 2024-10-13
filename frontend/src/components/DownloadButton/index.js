
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import styles from './styles'; 

const DownloadButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Svg width="80" height="80" viewBox="0 0 80 80">
            
                <Circle cx="40" cy="40" r="30" fill="#738F81" />
           
                <Circle cx="40" cy="40" r="25" fill="#FFFFFF" />
                    <Path 
                    d="M8.39645 9.45895L5.50626 12.3491L4.45096 11.2561L10 5.70711L15.549 11.2561L14.4937 12.3491L11.6036 9.45895L10.75 8.60539V9.8125V19.5H9.25V9.8125V8.60539L8.39645 9.45895ZM2 2.5V5.75H0.5V2.5C0.5 1.94616 0.691365 1.48449 1.08793 1.08793C1.48449 0.691365 1.94616 0.5 2.5 0.5H17.5C18.0538 0.5 18.5155 0.691365 18.9121 1.08793C19.3086 1.48449 19.5 1.94616 19.5 2.5V5.75H18V2.5V2H17.5H2.5H2V2.5Z" 
                    fill="#738F81"
                    stroke="#738F81"
                    transform="translate(30, 30.5)"
                    />

                
            </Svg>
        </TouchableOpacity>
    );
};

export default DownloadButton;
