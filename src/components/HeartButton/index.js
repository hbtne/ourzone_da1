import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import HeartIcon from '../../../assets/icons/HeartIcon';
import FullHeartIcon from '../../../assets/icons/FullHeartIcon';
import styles from './styles';
const HeartButton = ({ likes, onLike, postId , updateLikesInFirebase}) => {
  const [liked, setLiked] = useState(false);

  const handlePress = () => {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;

    setLiked(newLiked);
    onLike(newLiked); // Update UI
    updateLikesInFirebase(postId, newLikes); // Update Firebase
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        {liked ? (
          <FullHeartIcon width={30} height={30} color="#fff" />
        ) : (
          <HeartIcon width={30} height={30} color="#fff" />
        )}
      </TouchableOpacity>
      <Text style={styles.countText}>{likes}</Text>
    </View>
  );
};

export default HeartButton;
