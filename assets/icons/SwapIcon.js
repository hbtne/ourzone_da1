import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<?xml version="1.0" ?>
<svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
  <title/>
  <polyline points="304 48 416 160 304 272" style="fill:none;stroke:#738F81;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
  <line style="fill:none;stroke:#738F81;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="398.87" x2="96" y1="160" y2="160"/>
  <polyline points="208 464 96 352 208 240" style="fill:none;stroke:#738F81;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
  <line style="fill:none;stroke:#738F81;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="114" x2="416" y1="352" y2="352"/>
</svg>
`;

const SwapIcon = ({ width = 32, height = 32, color = '#000' }) => (
  <SvgXml xml={xml} width={width} height={height} fill={color} />
);

export default SwapIcon;
