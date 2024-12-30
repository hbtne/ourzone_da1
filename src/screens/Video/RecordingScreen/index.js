import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Alert, SafeAreaView, Text } from 'react-native';
import { Camera,CameraView, useCameraPermissions,useMicrophonePermissions} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av'; // Đảm bảo import Video từ expo-av
import FlashIcon from '../../../../assets/icons/FlashIcon';
import CameraButton from '../../../components/CameraButton';
import DownloadIcon from '../../../../assets/icons/DownloadIcon';
import CancelIcon from '../../../../assets/icons/CancelIcon';
import SwapIcon from '../../../../assets/icons/SwapIcon';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



const RecordingScreen = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState(null);
  const [flashMode, setFlashMode] = useState('off');
  const [cameraType, setCameraType] = useState('back');
  
  // Sử dụng hook từ expo-camera để lấy quyền camera và microphone
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();

  useEffect(() => {
    const getPermissions = async () => {
      try {
        // Request camera and microphone permissions
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
        const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();

        setHasMediaLibraryPermission(mediaLibraryStatus.granted);

        // Check if the permissions were granted, and handle errors appropriately
        if (cameraStatus !== 'granted') {
          Alert.alert('Permission Error', 'Camera permission is required to continue');
        }
        if (audioStatus !== 'granted') {
          Alert.alert('Permission Error', 'Microphone permission is required to record audio');
        }
      } catch (error) {
        console.log('Permission request error: ', error);
        Alert.alert('Permission Error', 'There was an error requesting permissions');
      }
    };

    getPermissions();
  }, []);

  // Check permissions before rendering the camera
  if (!cameraPermission || !microphonePermission || cameraPermission.status !== 'granted' || microphonePermission.status !== 'granted') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera and record audio</Text>
        <TouchableOpacity onPress={requestCameraPermission} style={styles.controlButton}>
          <Text>Grant Camera Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={requestMicrophonePermission} style={styles.controlButton}>
          <Text>Grant Microphone Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const toggleFlash = () =>
    setFlashMode((prevMode) => (prevMode === 'off' ? 'torch' : 'off'));

  const toggleCameraType = () =>
    setCameraType((prevType) => (prevType === 'back' ? 'front' : 'back'));

  const recordVideo = async () => {
    if (!cameraRef.current) {
      console.log('Camera is not ready');
      return;
    }
  
    if (isRecording) {
      cameraRef.current.stopRecording();
      return;
    }
  
    try {
      setIsRecording(true);
      const options = { maxDuration: 10, quality: '480p' };
      const recordedVideo = await cameraRef.current.recordAsync(options);
  
      console.log('Video recorded:', recordedVideo.uri);
      Alert.alert('Uploading', 'Uploading video to Cloudinary...');
  
      // Prepare the video for Cloudinary upload
      const formData = new FormData();
      formData.append('file', {
        uri: recordedVideo.uri,
        type: 'video/mp4',
        name: 'video.mp4',
      });
      formData.append('upload_preset', 'Default');
  
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dibmnb2rp/video/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      console.log('Cloudinary Response:', response.data);
  
      if (response.data.secure_url) {
        Alert.alert('Success', 'Video uploaded successfully!');
        setVideo(recordedVideo);
        navigation.navigate('VideoStack', {
          screen: 'Confirmation',
          params: { videoUri: response.data.secure_url },
        });
      } else {
        Alert.alert('Upload Failed', 'Failed to upload video to Cloudinary.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      Alert.alert('Error', 'Failed to record or upload the video.');
    } finally {
      setIsRecording(false);
    }
  };
  
  
  
  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };
  

  const saveVideo = async () => {
    if (hasMediaLibraryPermission && video) {
      await MediaLibrary.saveToLibraryAsync(video.uri);
      Alert.alert('Success', 'Video saved to your gallery!');
      setVideo(null);
    } else {
      Alert.alert('Permission Error', 'You need to grant media library permissions to save the video.');
    }
  };

  if (!cameraPermission || !cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestCameraPermission} style={styles.controlButton}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!microphonePermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to record audio</Text>
        <TouchableOpacity onPress={requestMicrophonePermission} style={styles.controlButton}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

 
  return (
    <CameraView
      style={styles.container}
      ref={cameraRef}
      enableTorch={flashMode === 'torch'}
      type={cameraType}
      zoom={0}
      mode="video"
      facing={cameraType}
      onCameraReady={() => console.log('Camera is ready')}
      pointerEvents="box-none"
    >
      <View style={styles.cameraControls}>
        <TouchableOpacity onPress={toggleFlash} style={styles.controlButton}>
          <FlashIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={isRecording ? stopRecording : recordVideo}
          style={[styles.controlButton, isRecording && styles.recording]}
        >
          <CameraButton onPress={recordVideo} isRecording={isRecording} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCameraType} style={styles.controlButton}>
          <SwapIcon />
        </TouchableOpacity>
      </View>
    </CameraView>
  );
};

export default RecordingScreen;
