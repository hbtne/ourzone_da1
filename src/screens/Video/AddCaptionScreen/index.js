
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
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

const AddCaptionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { videoUri } = route.params || {};
  
  const [caption, setCaption] = useState('');
  const [music, setMusic] = useState('');
  const [isMusicModalVisible, setMusicModalVisible] = useState(false);
  const [musicList, setMusicList] = useState([]);

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
    setMusic(selectedMusicUrl); // Cập nhật nhạc đã chọn
    setMusicModalVisible(false); // Đóng modal
  };
  const handleSave = async () => {
    const userId = auth.currentUser?.uid;
    console.log("User ID:", userId);
    
    if (!userId) {
      alert('User not found!');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: videoUri,
      type: 'video/mp4',
      name: 'video.mp4',
    });
    formData.append('upload_preset', 'Default');
    formData.append('user_id', userId);
    formData.append('caption', caption);
    formData.append('music', music);

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dibmnb2rp/video/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data.secure_url) {
        alert('Video uploaded successfully!');
        const videoData = {
          userId: userId,
          videoUrl: response.data.secure_url,
          caption: caption,
          music: music,
          likes: 0,
          comments: 0,
        };

        const db = getFirestore();
        
        // Save the video data to the 'posts' collection
        const docRef = await addDoc(collection(db, 'posts'), videoData);
        console.log('Video data saved to Firestore:', docRef.id);

        // Update the user's document by adding the post ID to their posts array
        const userRef = doc(db, 'users', userId); // Assuming 'users' collection contains user documents
        await updateDoc(userRef, {
          posts: arrayUnion(docRef.id) // Adds the new post ID to the 'posts' array
        });

        console.log('User document updated with new post ID');
        navigation.navigate('Home');
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('An error occurred while uploading the video to Cloudinary');
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

  {/* Modal chọn nhạc */}
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
// import React, { useState, useEffect } from 'react';
// import { View, TextInput, TouchableOpacity, Text } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { getAuth } from 'firebase/auth';
// import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
// import axios from 'axios';
// import DoneButton from '../../../components/DoneButton';
// import BackIcon from '../../../../assets/icons/BackIcon';
// import InsertCaptionIcon from '../../../../assets/icons/InsertCaptionIcon';
// import InsertMusicIcon from '../../../../assets/icons/InsertMusicIcon';
// import { Video } from 'expo-av';
// import styles from './styles';
// import MusicSelectionModal from '../../../components/MusicSelectionModal'; 
// import { fetchMusicFromCloudinary } from '../../../../cloudinaryService';
// import { Audio } from 'expo-av'; // For audio control

// const AddCaptionScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { videoUri } = route.params || {};
  
//   const [caption, setCaption] = useState('');
//   const [music, setMusic] = useState('');
//   const [isMusicModalVisible, setMusicModalVisible] = useState(false);
//   const [musicList, setMusicList] = useState([]);
//   const [sound, setSound] = useState(); // To handle music playback
  
//   const auth = getAuth();

//   useEffect(() => {
//     const user = auth.currentUser;
//     console.log("Current User: ", user);
//     const loadMusic = async () => {
//       const musicData = await fetchMusicFromCloudinary();
//       setMusicList(musicData); console.log(musicData);
//     };

//     loadMusic();
//   }, []);

//   const handleSelectMusic = (selectedMusicUrl) => {
//     setMusic(selectedMusicUrl); // Update selected music
//     setMusicModalVisible(false); // Close modal

//     // Play the selected music
//     const loadSound = async () => {
//       const { sound } = await Audio.Sound.createAsync(
//         { uri: selectedMusicUrl },
//         { shouldPlay: true }
//       );
//       setSound(sound); // Keep track of sound instance for later control
//     };
    
//     loadSound();
//   };

//   const handleSave = async () => {
//     const userId = auth.currentUser?.uid;
//     console.log("User ID:", userId);
    
//     if (!userId) {
//       alert('User not found!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', {
//       uri: videoUri,
//       type: 'video/mp4',
//       name: 'video.mp4',
//     });
//     formData.append('upload_preset', 'Default');
//     formData.append('user_id', userId);
//     formData.append('caption', caption);
//     formData.append('music', music);

//     try {
//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/dibmnb2rp/video/upload',
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );

//       if (response.data.secure_url) {
//         alert('Video uploaded successfully!');
//         const videoData = {
//           userId: userId,
//           videoUrl: response.data.secure_url,
//           caption: caption,
//           music: music,
//           likes: 0,
//           comments: 0,
//         };

//         const db = getFirestore();
        
//         // Save the video data to the 'posts' collection
//         const docRef = await addDoc(collection(db, 'posts'), videoData);
//         console.log('Video data saved to Firestore:', docRef.id);

//         // Update the user's document by adding the post ID to their posts array
//         const userRef = doc(db, 'users', userId); // Assuming 'users' collection contains user documents
//         await updateDoc(userRef, {
//           posts: arrayUnion(docRef.id) // Adds the new post ID to the 'posts' array
//         });

//         console.log('User document updated with new post ID');
//         navigation.navigate('Home');
//       } else {
//         alert('Upload failed');
//       }
//     } catch (error) {
//       console.error('Error uploading video:', error);
//       alert('An error occurred while uploading the video to Cloudinary');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
//         <BackIcon />
//       </TouchableOpacity>

//       <Video
//         source={{ uri: videoUri }}
//         style={styles.videoPlayer}
//         resizeMode="contain"
//         shouldPlay
//         isLooping
//         useNativeControls
//       />

//       <View style={styles.captionContainer}>
//         <View style={styles.splitBar}></View>

//         <View style={styles.caption}>
//           <TouchableOpacity>
//             <InsertCaptionIcon style={styles.icon} />
//           </TouchableOpacity>
//           <TextInput
//             style={styles.text}
//             placeholder="Add a caption for your post"
//             multiline
//             numberOfLines={4}
//             maxLength={100}
//             textAlignVertical="top"
//             placeholderTextColor="#FFFFFF"
//             value={caption}
//             onChangeText={setCaption}
//           />
//         </View>

//         <View style={styles.splitBar}></View>

//         <View style={styles.caption}>
//           <TouchableOpacity onPress={() => setMusicModalVisible(true)}>
//             <InsertMusicIcon style={styles.icon} />
//           </TouchableOpacity>
//           <Text style={styles.text}>
//             {music ? `  ${music.split('/').pop().replace('.mp3', '').replace(/-/g, ' ')}` : 'Add some music for your post'}
//           </Text>

//           {/* Music Selection Modal */}
//           {isMusicModalVisible && (
//             <MusicSelectionModal
//               musicList={musicList}
//               onSelectMusic={handleSelectMusic}
//               onClose={() => setMusicModalVisible(false)}
//             />
//           )}
//         </View>

//         <View style={styles.splitBar}></View>
//       </View>

//       <View style={styles.footerContainer}>
//         <DoneButton onPress={handleSave} />
//       </View>
//     </View>
//   );
// };

// export default AddCaptionScreen;
