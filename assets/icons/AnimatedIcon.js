import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';

const AnimatedIcon = React.memo(({ xml, focused, size, isActive }) => {
  const iconRef = useRef(null);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    iconRef.current?.animate({
      0: { scale: isActive ? 1.5 : 0.5, rotate: '0deg' },
      1: { scale: isActive ? 2 : 1.5, rotate: '360deg' }
    });
  }, [focused, pressed, isActive]);

  return (
    <TouchableOpacity
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={styles.icon}
    >
      <Animatable.View ref={iconRef} duration={1000}>
        <SvgXml xml={xml} width={size} height={size} />
      </Animatable.View>
    </TouchableOpacity>
  );
});

export default AnimatedIcon;

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
