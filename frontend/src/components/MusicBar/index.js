// MusicBar.js
import React from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './styles'; // Nhập styles từ file styles.js
import MusicIcon from '../../../assets/icons/MusicIcon'; // Đường dẫn đến file MusicIcon.js

const MusicBar = ({ songName }) => {
  const scrollAnim = new Animated.Value(0);

  // Chạy chữ
  Animated.loop(
    Animated.timing(scrollAnim, {
      toValue: -100, // Giá trị cuối để chạy chữ
      duration: 8000, // Thời gian chạy
      useNativeDriver: true,
    })
  ).start();

  const translateX = scrollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200], // Điều chỉnh giá trị này để phù hợp với chiều dài tên bài hát
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MusicIcon width={24} height={24} />
      </View>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Text style={styles.songName}>{songName}</Text>
      </Animated.View>
    </View>
  );
};

export default MusicBar;
