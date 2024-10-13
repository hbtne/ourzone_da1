import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

const SendIcon = ({ width = 38, height = 37, color = "white" }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 38 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0)">
        <Path
          d="M12 25L1 20L27 10L17 36L12 25Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 25L18 19"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="38" height="27" fill="white" transform="translate(0 9)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SendIcon;
