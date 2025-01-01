import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import { database } from '../../../firebase/firebase';
import { ref, onValue, set, push } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { auth, db } from '../../../firebase/firebase'; // Lấy auth từ Firebase (nếu cần)

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dibmnb2rp/image/upload'; // Thay 'dibmnb2rp' bằng cloudName của bạn
const CLOUDINARY_UPLOAD_PRESET = 'avatar_upload_preset'; // Tên preset của bạn trên Cloudinary

const ChatScreen = ({ route }) => {
  const { userId, receiverId, receiverName, receiverAvatar } = route.params;

  if (!userId || !receiverId) {
    console.error('Missing userId or receiverId');
    return <Text>Error: Missing user data.</Text>;
  }

  const conversationId = userId < receiverId ? `${userId}_${receiverId}` : `${receiverId}_${userId}`;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, `conversations/${conversationId}/messages`);
    onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const sortedMessages = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => a.timestamp - b.timestamp);

        setMessages(sortedMessages);
      }
    });
  }, [conversationId, userId]);

  const sendMessage = (text, imageUrl = null) => {
    if (text.trim() || imageUrl) {
      const messagesRef = ref(database, `conversations/${conversationId}/messages`);
      const newMessageRef = push(messagesRef);

      const messageData = {
        text: text,
        imageUrl: imageUrl,
        timestamp: Date.now(),
        sender: userId,
        receiverId: receiverId,
        isSeen: false,
      };

      set(newMessageRef, messageData)
        .then(() => {
          set(ref(database, `conversations/${conversationId}/lastMessage`), messageData);
          setNewMessage('');
        })
        .catch((error) => {
          console.error('Error sending message: ', error);
        });
    }
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Cho phép người dùng cắt ảnh
      aspect: [4, 4], // Tỷ lệ cắt ảnh
      quality: 1, // Chất lượng ảnh
    });

    if (!pickerResult.canceled) {
      const imageUri = pickerResult.assets[0].uri; // Đường dẫn ảnh đã chọn
      await uploadImageToCloudinary(imageUri); // Tiến hành upload ảnh lên Cloudinary
    }
  };

  const uploadImageToCloudinary = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('file', { uri: imageUri, type: 'image/jpeg', name: 'avatar.jpg' }); // Định dạng ảnh
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); // Preset để upload

      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.secure_url) {
        const downloadUrl = response.data.secure_url; // Link ảnh từ Cloudinary
        sendMessage('', downloadUrl); // Gửi ảnh với URL từ Cloudinary
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      Alert.alert('Upload Error', 'Failed to upload image to Cloudinary. Please try again.');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: receiverAvatar }} style={styles.avatar} />
        <Text style={styles.headerText}>{receiverName}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === userId ? styles.myMessage : styles.otherMessage,
            ]}
          >
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.imageMessage} />
            ) : null}
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {formatTime(item.timestamp)}{' '}
              {item.sender === userId && item.isSeen ? '(Seen)' : ''}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(newMessage)}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>

        {/* Button to choose image */}
        <TouchableOpacity style={styles.sendButton} onPress={handleImagePicker}>
          <Text style={styles.sendButtonText}>📷</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000'
   },
  header: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
  },
  myMessage: {
    backgroundColor: 'rgba(115, 143, 129, 0.6)',
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  otherMessage: {
    backgroundColor: '#555',
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messageText: {
     color: '#fff',
      fontSize: 16
     },
  timestamp: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(115, 143, 129, 0.6)',
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  input:
   { 
    flex: 1, 
    color: '#fff',
     marginRight: 10 
    },
  sendButton:
   { 
    backgroundColor: '#4CAF50', 
    borderRadius: 10, 
    padding: 10 
  },
  sendButtonText: { 
    color: '#fff'
   },
   imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ChatScreen;