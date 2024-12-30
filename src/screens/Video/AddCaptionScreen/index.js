
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import axios from 'axios';
import DoneButton from '../../../components/DoneButton';
import BackIcon from '../../../../assets/icons/BackIcon';
import InsertCaptionIcon from '../../../../assets/icons/InsertCaptionIcon';
import InsertMusicIcon from '../../../../assets/icons/InsertMusicIcon';
import { Video } from 'expo-av';
import styles from './styles';
import MusicSelectionModal from '../../../components/MusicSelectionModal'; 
import { fetchMusicFromCloudinary } from '../../../../cloudinaryService';
import { Audio } from 'expo-av'; 

const AddCaptionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { videoUri } = route.params || {};
  
  const [caption, setCaption] = useState('');
  const [music, setMusic] = useState('');
  const [isMusicModalVisible, setMusicModalVisible] = useState(false);
  const [musicList, setMusicList] = useState([]);
  const [sound, setSound] = useState(); 
  
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    console.log("Current User: ", user);
    const loadMusic = async () => {
      const musicData = await fetchMusicFromCloudinary();
      setMusicList(musicData); console.log(musicData);
    };

    loadMusic();
  }, []);

  const handleSelectMusic = (selectedMusicUrl) => {
    setMusic(selectedMusicUrl);
    setMusicModalVisible(false); 

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: selectedMusicUrl },
        { shouldPlay: true }
      );
      setSound(sound);
    };
    
    loadSound();
  };

  const handleSave = async () => {
    const userId = auth.currentUser?.uid;
    console.log("User ID:", userId);
  
    if (!userId) {
      alert('User not found!');
      return;
    }
  
    try {
      // Giả sử videoUri đã được upload trước đó và có URL từ Cloudinary
      const videoData = {
        userId: userId,
        videoUrl: videoUri, // Link video từ màn hình trước
        caption: caption,
        music: music,
        likes: 0,
        comments: 0,
      };
  
      // Thêm dữ liệu video vào collection 'posts'
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'posts'), videoData);
      console.log('Video data saved to Firestore:', docRef.id);
  
      // Cập nhật post ID vào document của user trong collection 'users'
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        posts: arrayUnion(docRef.id),
      });
  
      console.log('User document updated with new post ID');
      alert('Post saved successfully!');
      navigation.navigate('Home'); // Quay lại màn hình Home
    } catch (error) {
      console.error('Error saving post:', error);
      alert('An error occurred while saving the post.');
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
        <BackIcon />
      </TouchableOpacity>

      <Video
        source={{ uri: videoUri }}
        style={styles.videoPlayer}
        resizeMode="contain"
        shouldPlay
        isLooping
        useNativeControls
      />

      <View style={styles.captionContainer}>
        <View style={styles.splitBar}></View>

        <View style={styles.caption}>
          <TouchableOpacity>
            <InsertCaptionIcon style={styles.icon} />
          </TouchableOpacity>
          <TextInput
            style={styles.text}
            placeholder="Add a caption for your post"
            multiline
            numberOfLines={4}
            maxLength={100}
            textAlignVertical="top"
            placeholderTextColor="#FFFFFF"
            value={caption}
            onChangeText={setCaption}
          />
        </View>

        <View style={styles.splitBar}></View>

        <View style={styles.caption}>
          <TouchableOpacity onPress={() => setMusicModalVisible(true)}>
            <InsertMusicIcon style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.text}>
            {music ? `  ${music.split('/').pop().replace('.mp3', '').replace(/-/g, ' ')}` : 'Add some music for your post'}
          </Text>

          {/* Music Selection Modal */}
          {isMusicModalVisible && (
            <MusicSelectionModal
              musicList={musicList}
              onSelectMusic={handleSelectMusic}
              onClose={() => setMusicModalVisible(false)}
            />
          )}
        </View>

        <View style={styles.splitBar}></View>
      </View>

      <View style={styles.footerContainer}>
        <DoneButton onPress={handleSave} />
      </View>
    </View>
  );
};

export default AddCaptionScreen;
