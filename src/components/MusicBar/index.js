import React from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './styles'; // Import styles
import MusicIcon from '../../../assets/icons/MusicIcon'; // Đường dẫn tới MusicIcon

const MusicBar = ({ songName }) => {
  const scrollAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: 1,
        duration: 10000, // 10 giây để cuộn
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = scrollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -300], // Điều chỉnh giá trị âm đủ lớn
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MusicIcon width={24} height={24} />
      </View>
      <View style={styles.scrollContainer}>
        <Animated.Text style={[styles.songName, { transform: [{ translateX }] }]}>
          {songName}
        </Animated.Text>
      </View>
    </View>
  );
};

export default MusicBar;
