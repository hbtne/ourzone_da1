import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

import CommentIcon from '../../../../assets/icons/CommentIcon'; 
import SendIcon from '../../../../assets/icons/SendIcon'; 
import SearchIcon from '../../../../assets/icons/SearchIcon'; 
import ArrowDownIcon from '../../../../assets/icons/ArrowDownIcon';
import MoreIcon from '../../../../assets/icons/MoreIcon';
import FollowButton from '../../../components/FollowButton/index';
import HeartButton from '../../../components/HeartButton/index';
import MusicBar from '../../../components/MusicBar/index';
import CommentBottomSheet from '../../../components/CommentBottomSheet'; // Nhập CommentBottomSheet

const HomeScreen = () => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false); // State để điều khiển Bottom Sheet

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  return (
    <View style={styles.postContainer}>
      {/* Header with navigation icons */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Text style={styles.title}>Reels </Text>
          <ArrowDownIcon width={24} height={24} color="#fff" />
        </View>
        <SearchIcon width={30} height={30} color="#fff" />
      </View>

      <View style={styles.content}>
        <View style={styles.interactionButtons}>
          <View style={styles.buttonContainer}>
            <HeartButton />
          </View>
          <TouchableOpacity onPress={toggleBottomSheet} style={styles.buttonContainer}>
            <CommentIcon width={30} height={30} color="#fff" />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <SendIcon width={30} height={30} color="#fff" />
          </View>
        </View>
      </View>

      <FollowButton />

      {/* Footer with follow button and more options */}
      <View style={styles.footer}>
        <MusicBar songName="Tên bài hát đang phát" />
        <MoreIcon width={24} height={24} color="#fff" />
      </View>

      {/* Bottom Sheet for comments */}
      <CommentBottomSheet isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} />
    </View>
  );
};

export default HomeScreen;
