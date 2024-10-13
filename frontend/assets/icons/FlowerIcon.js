import React from 'react';
import { Svg, Path } from 'react-native-svg';

const FlowerIcon = ({ width = 106, height = 116, strokeColor = "#738F81" }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 106 116" fill="none">
            <Path 
                d="M20.5 26.1429L32.2672 2.21143L53 12.2143L72.0517 2.21143L85.5 26.1429C85.5 44.0921 70.9493 58.6429 53 58.6429C35.0507 58.6429 20.5 44.0921 20.5 26.1429Z" 
                stroke={strokeColor} 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
            />
            <Path 
                d="M53 58.6428V114.357" 
                stroke={strokeColor} 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
            />
            <Path 
                d="M53 105.071V114.357H76.2143C91.5998 114.357 104.071 101.886 104.071 86.5001V81.8572C104.071 79.2931 101.992 77.2144 99.4286 77.2144H80.8571C65.4721 77.2144 53 89.686 53 105.071Z" 
                stroke={strokeColor} 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
            />
            <Path 
                d="M1.92859 81.8572V86.5001C1.92859 101.886 14.4007 114.357 29.7857 114.357H53V105.071C53 89.686 40.5279 77.2144 25.1429 77.2144H6.57145C4.00729 77.2144 1.92859 79.2931 1.92859 81.8572Z" 
                stroke={strokeColor} 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
            />
        </Svg>
    );
};

export default FlowerIcon;
