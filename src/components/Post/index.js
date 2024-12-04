import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native';
import { Video, Audio } from 'expo-av';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import FollowButton from '../FollowButton';
import HeartButton from '../HeartButton';
import MusicBar from '../MusicBar';
import CommentBottomSheet from '../CommentBottomSheet';
import CommentIcon from '../../../assets/icons/CommentIcon';
import SendIcon from '../../../assets/icons/SendIcon';
import MoreIcon from '../../../assets/icons/MoreIcon';
import styles from './styles';

const Post = ({ item }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [likes, setLikes] = useState(item.likes || 0);
  const [sound, setSound] = useState();
  const [videoRef, setVideoRef] = useState(null);
  const [isSoundError, setIsSoundError] = useState(false); // Kiểm tra lỗi âm thanh
  const [isVideoPaused, setIsVideoPaused] = useState(false); // Kiểm tra trạng thái dừng video

  useEffect(() => {
    // Kiểm tra nếu có link nhạc và cố gắng tải âm thanh
    if (item.music && !isSoundError) {
      const loadSound = async () => {
        try {
          const { sound: playbackObject } = await Audio.Sound.createAsync(
            { uri: item.music },
            { shouldPlay: true, isLooping: true }
          );
          setSound(playbackObject);
        } catch (error) {
          console.error("Error loading sound: ", error);
          setIsSoundError(true); // Đánh dấu lỗi khi không thể tải nhạc
        }
      };

      loadSound();

      return () => {
        // Hủy âm thanh khi component unmount
        if (sound) {
          sound.unloadAsync();
        }
      };
    }
  }, [item.music, isSoundError]);

  const toggleBottomSheet = () => setBottomSheetVisible(!isBottomSheetVisible);

  const handleLike = (liked) => {
    setLikes((prevLikes) => (liked ? prevLikes + 1 : prevLikes - 1));
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this amazing video from ${item.channelName || 'Unknown'}: ${item.videoUrl}`,
      });
      console.log(result);
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  const updateLikesInFirebase = async (postId, newLikes) => {
    try {
      const db = getFirestore();
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, { likes: newLikes });
      console.log('Likes updated successfully!');
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleVideoStatusUpdate = (status) => {
    if (status.didJustFinish || !status.isPlaying) {
      setIsVideoPaused(true);
      if (sound) {
        sound.stopAsync(); // Dừng âm thanh khi video kết thúc hoặc dừng
      }
    }
  };

  return (
    <View style={styles.postContainer}>
      {item.videoUrl ? (
        <Video
          ref={setVideoRef}
          source={{ uri: item.videoUrl }}
          style={styles.video}
          resizeMode="cover"
          shouldPlay={true}
          isLooping
          useNativeControls
          isMuted={isSoundError} // Nếu gặp lỗi âm thanh, tắt tiếng video
          onPlaybackStatusUpdate={handleVideoStatusUpdate} // Theo dõi trạng thái video
          onPause={() => {
            setIsVideoPaused(true); // Khi video tạm dừng
            if (sound) sound.stopAsync(); // Dừng âm thanh khi video dừng
          }}
        />
      ) : (
        <Text style={styles.errorText}>Video is unavailable</Text>
      )}

      <LinearGradient colors={['transparent', 'rgba(0,0,0,0)']} style={styles.overlayContainer}>
        <View style={styles.channelContainer}>
          <Image
            source={{ uri: item.avatar || 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
          <Text style={styles.channelName}>{item.name || 'Unknown'}</Text>
          <FollowButton />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.caption}>{item.caption}</Text>
          <MusicBar style={styles.musicName} songName={item.music ? item.music.split('/').pop().replace('.mp3', '').replace(/-/g, ' ') : 'No music'} />
        </View>
      </LinearGradient>

      <View style={styles.interactionContainer}>
        <HeartButton likes={likes} onLike={handleLike} postId={item.id} updateLikesInFirebase={updateLikesInFirebase} />

        <TouchableOpacity onPress={toggleBottomSheet} style={styles.buttonContainer}>
          <CommentIcon width={30} height={30} color="#fff" />
          <Text style={styles.countText}>{item.comments || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare} style={styles.buttonContainer}>
          <SendIcon width={30} height={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.moreButton}>
          <MoreIcon width={24} height={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <CommentBottomSheet isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} />
    </View>
  );
};

export default Post;
