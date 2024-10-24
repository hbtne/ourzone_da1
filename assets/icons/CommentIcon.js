import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

const CommentIcon = ({ width = 31, height = 31, color = "white" }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0)">
        <Path
          d="M20.4822 11.0714C22.9781 11.0714 25.3717 12.0629 27.1365 13.8278C28.9013 15.5926 29.8929 17.9863 29.8929 20.4821C29.8988 22.3346 29.3512 24.1466 28.3207 25.6857L29.8929 29.8928L24.6007 28.9407C23.3279 29.5614 21.9316 29.8869 20.5157 29.8928C19.0997 29.8988 17.7006 29.5851 16.4227 28.9752C15.1447 28.3654 14.0209 27.4748 13.1349 26.3704C12.249 25.2659 11.6237 23.9756 11.3056 22.5957C10.9876 21.2159 10.9851 19.7821 11.2982 18.4012C11.6113 17.0202 12.232 15.7277 13.114 14.62C13.9961 13.5123 15.1167 12.6179 16.3925 12.0035C17.6682 11.3891 19.0662 11.0705 20.4822 11.0714Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21.8329 5.55789C20.3417 3.66041 18.296 2.2751 15.9806 1.59486C13.6651 0.914618 11.1952 0.973292 8.91463 1.76271C6.63409 2.55213 4.65647 4.033 3.25706 5.99916C1.85768 7.96529 1.10618 10.3189 1.1072 12.7322C1.10034 15.0262 1.77886 17.27 3.05576 19.1757L1.1072 24.3571L5.80148 23.5157"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="31" height="31" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CommentIcon;
