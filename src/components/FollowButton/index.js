import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles'; // Import styles từ file styles.js

const FollowButton = () => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handlePress = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isFollowed && styles.followedButton]}
          onPress={handlePress}
        >
          <Text numberOfLines={1}  style={[styles.buttonText, isFollowed && styles.followedText]}>
            {isFollowed ? 'Followed' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FollowButton;
