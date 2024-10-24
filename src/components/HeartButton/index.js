import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import HeartIcon from '../../../assets/icons/HeartIcon';
import FullHeartIcon from '../../../assets/icons/FullHeartIcon';
import styles from './styles';

const HeartButton = () => {
  const [liked, setLiked] = useState(false);

  const handlePress = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        {liked ? <FullHeartIcon size={40} color="white" /> : <HeartIcon size={40} color="white" />}
      </TouchableOpacity>
    </View>
  );
};

export default HeartButton;
