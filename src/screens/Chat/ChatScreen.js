import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { database } from '../../../firebase/firebase';
import { ref, onValue, set, push } from 'firebase/database';

const ChatScreen = ({ route }) => {
  const { userId, receiverId, receiverName, receiverAvatar } = route.params;

  if (!userId || !receiverId) {
    console.error('Missing userId or receiverId');
    return <Text>Error: Missing user data.</Text>;
  }

  const conversationId =
    userId < receiverId ? `${userId}_${receiverId}` : `${receiverId}_${userId}`;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, `conversations/${conversationId}/messages`);
    onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const sortedMessages = Object.values(data).sort(
          (a, b) => a.timestamp - b.timestamp
        );
        setMessages(sortedMessages);
      }
    });
  }, [conversationId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messagesRef = ref(database, `conversations/${conversationId}/messages`);
      const newMessageRef = push(messagesRef);

      set(newMessageRef, {
        text: newMessage,
        timestamp: Date.now(),
        sender: userId,
      })
        .then(() => {
          setNewMessage('');
        })
        .catch((error) => {
          console.error('Error sending message: ', error);
        });
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Header với avatar và tên */}
      <View style={styles.header}>
        <Image source={{ uri: receiverAvatar }} style={styles.avatar} />
        <Text style={styles.headerText}>{receiverName}</Text>
      </View>
      {/* Danh sách tin nhắn */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === userId ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
          </View>
        )}
      />
      {/* Input gửi tin nhắn */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
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
});

export default ChatScreen;
