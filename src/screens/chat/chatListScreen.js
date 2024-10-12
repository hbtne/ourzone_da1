import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
import searchIcon from '../../../assets/icons/search-icon';
import backIcon from '../../../assets/icons/back-icon';
const messagesData = [
    { id: '1', user: 'HBT', message: 'Hello!', time: '2 mins ago', read: true, type: 'sent', status: 'Sent' },
    { id: '2', user: 'HaBaoTran', message: 'Đọc tin nhắn đi', time: '2 mins ago', read: false, type: 'received', status: 'Seen' },
  ];
  


const MessageItem = ({ item }) => (
    <View style={[styles.messageItem, item.type === 'sent' ? styles.sentMessage : styles.receivedMessage]}>
      <View style={styles.messageContent}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
      <Text style={styles.timeText}>{item.time}</Text>
      <Text style={styles.statusText}>{item.status}</Text>
    </View>
  );
  
const ChatListScreen = () => {
  const [search, setSearch] = useState('');

  const filteredMessages = messagesData.filter(
    msg => msg.user.toLowerCase().includes(search.toLowerCase()) || msg.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.buttonBack}>
         <SvgXml style={styles.iconBack} xml={backIcon}/>
         </TouchableOpacity>
    <Text style={styles.text1}> Messages</Text>
      <View style={styles.searchBar}>
      <TextInput
        style={styles.searchBar1}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}>
        </TextInput>
        <SvgXml style={styles.iconSearch} xml={searchIcon}/>
        </View>
      <Animated.View
        style={styles.animatedContainer}
        entering={SlideInDown}
        exiting={SlideOutDown}
      >
      <FlatList
        data={filteredMessages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MessageItem item={item} />}
      />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  animatedContainer: {
    flex: 1,
  },
  buttonBack:
  {
    position: 'absolute',
    marginTop:48,
    marginLeft:10,
  },
  iconBack: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  text1:
  {
   marginLeft:90,
    color:'#738F81',
    fontSize:30,
    marginTop:35,
    fontFamily:'OpenSansBold'
  },
  searchBar: {
    height:45,
    width:'90%',
    borderRadius: 30,
    color: '#ffffff',
    backgroundColor:'rgba(115, 143, 129, 0.5)',
    marginTop:10,
    marginLeft:15,
  },
  searchBar1: {
    padding: 10,
    marginLeft:30,
    color: '#ffffff',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#1C1C1C',
    marginVertical: 5,
  },
  messageContent: {
    flex: 1,
  },
  iconSearch:
  {
    bottom:32,
    left:10,
  },
  userName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageText: {
    color: '#b0b0b0',
  },
  timeText: {
    color: '#b0b0b0',
    marginLeft: 10,
    
  },
  readIcon: {
    color: '#00FF00', 
  },
  unreadIcon: {
    color: '#FF4500',
  },
});

export default ChatListScreen;
