import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { database } from '../../../firebase/firebase';
import { ref, onValue } from 'firebase/database';

const MessagesScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const conversationsRef = ref(database, 'conversations');
    onValue(conversationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setConversations(formattedData);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <TextInput style={styles.searchBar} placeholder="Search..." />
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => navigation.navigate('ChatScreen', { conversationId: item.id })}
          >
            <Text style={styles.conversationName}>{item.name}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 10 },
  header: { color: '#fff', fontSize: 20, marginBottom: 10 },
  searchBar: { backgroundColor: '#222', borderRadius: 10, padding: 8, color: '#fff' },
  conversationItem: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
  conversationName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  lastMessage: { color: '#aaa', marginTop: 5 },
});

export default MessagesScreen;
