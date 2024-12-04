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
  
    // Check if recording is already in progress
    if (isRecording) {
      // If recording is in progress, stop it immediately
      cameraRef.current.stopRecording();
      setIsRecording(false);
      console.log('Recording stopped');
      return; // Exit to prevent starting a new recording
    }
  
    try {
      setIsRecording(true);
      const options = { maxDuration: 60, quality: '1080p' };
      const recordedVideo = await cameraRef.current.recordAsync(options);
      setVideo(recordedVideo);
      setIsRecording(false);
      navigation.navigate('VideoStack', {
        screen: 'Confirmation',
        params: { videoUri: recordedVideo.uri }
      });
          } catch (error) {
      console.log('Recording error: ', error);
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

  if (video) {
    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
        <View style={styles.controls}>
          <TouchableOpacity onPress={saveVideo} style={styles.controlButton}>
            <DownloadIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVideo(null)} style={styles.controlButton}>
            <CancelIcon />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
