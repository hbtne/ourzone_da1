// CancelIcon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CancelIcon = (props) => {
    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
            <Path 
                d="M2.7012 21.7357L0 19.0345L8.16667 10.8679L0 2.7012L2.7012 0L10.8679 8.16667L19.0345 0L21.7357 2.7012L13.5691 10.8679L21.7357 19.0345L19.0345 21.7357L10.8679 13.5691L2.7012 21.7357Z" 
                fill="white" 
            />
        </Svg>
    );
};

export default CancelIcon;
