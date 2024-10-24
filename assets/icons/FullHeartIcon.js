import React from 'react';
import Svg, { Path } from 'react-native-svg';

const FullHeartIcon = ({ width = 32, height = 26, color = 'white' }) => (
  <Svg width={width} height={height} viewBox="0 0 30 24" fill="none">
    <Path
      d="M3.03364 14.1975L14.0004 22.9543C14.3033 23.1961 14.4547 23.317 14.6316 23.3159C14.8085 23.3148 14.9584 23.192 15.2582 22.9464L26.1256 14.0427C29.6099 11.188 30.0337 6.01348 27.0603 2.62988C23.8396 -1.03511 17.9635 -0.417823 15.5747 3.83644L15.427 4.09947C15.0788 4.7196 14.1861 4.7196 13.8379 4.09947L13.6577 3.77847C11.265 -0.482861 5.4038 -1.15455 2.10907 2.45501C-1.03571 5.90029 -0.611588 11.2868 3.03364 14.1975Z"
      fill={color}
    />
  </Svg>
);

export default FullHeartIcon;
