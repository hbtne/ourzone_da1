import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SvgXml } from 'react-native-svg';
import ava from '../../assets/images/avatar.png';
import searchIcon from '../../assets/icons/search-icon';
import moreIcon from'../../assets/icons/more-icon';
const FollowingScreen = () => {
  const allResults = [
    { name: 'Tento', isFollowed: false },
    { name: 'TM', isFollowed: false },
  ];

  const [searchResults, setSearchResults] = useState(allResults);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearchChange = (text) => {
    const searchTerm = text.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredResults = allResults.filter((result) =>
      result.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredResults);
  };

  const toggleFollow = (index) => {
    const updatedResults = [...searchResults];
    updatedResults[index].isFollowed = !updatedResults[index].isFollowed;
    setSearchResults(updatedResults);
  };

  const removeResult = (index) => {
    const updatedResults = searchResults.filter((_, i) => i !== index);
    setSearchResults(updatedResults);
  };

  const openMenu = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleBlockUser = () => {
    console.log(`Blocked user: ${selectedUser.name}`);
    setModalVisible(false);
  };

  const handleRemoveUser = () => {
    setSearchResults((prevResults) =>
      prevResults.filter((result) => result !== selectedUser)
    );
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nameScreen}>Following</Text>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchBar1}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
        <SvgXml style={styles.iconSearch} xml={searchIcon} />
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.resultItem}>
            <Image source={ava} style={styles.avatar} />
            <Text style={styles.resultName}>{item.name}</Text>

            <TouchableOpacity
              style={[styles.button, item.isFollowed ? styles.follow : styles.followed]}
              onPress={() => toggleFollow(index)}>
              <Text style={styles.text}>{item.isFollowed ? '     Follow' : '   Followed'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openMenu(item)}>
              <SvgXml style={styles.menuButton} xml={moreIcon}/>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.noResults}>No results found</Text>
        )}
      />

      {modalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Options</Text>
              <TouchableOpacity onPress={handleBlockUser} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Block</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRemoveUser} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    padding: 20,
    flex: 1,
    color: '#fff',
  },
  nameScreen: {
    fontFamily: 'OpenSansBold',
    fontSize: 30,
    color: '#738F81',
  },
  searchBar: {
    height: 45,
    width: '90%',
    borderRadius: 30,
    color: '#ffffff',
    backgroundColor: 'rgba(115, 143, 129, 0.5)',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 15,
  },
  searchBar1: {
    padding: 10,
    marginLeft: 30,
    color: '#ffffff',
  },
  button: {
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 2,
    width: '32%',
    alignContent: 'center',
    marginRight:10,
  },
  follow: {
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  followed: {
    borderColor: 'white',
    backgroundColor: '#708F7B',
  },
  iconSearch: {
    bottom: 32,
    left: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(115, 143, 129, 0.7)',
    padding: 15,
    borderRadius: 35,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 90,
    marginRight: 10,
    backgroundColor: '#000000',
    alignItems: 'center',
    borderColor: '#708F7B',
    borderWidth: 4,
  },
  resultName: {
    flexGrow: 1,
    color: '#fff',
    fontFamily: 'OpenSansSemiBold',
  },
  text: {
    color: 'white',
  },
  menuButton: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#708F7B',
    padding: 20,
    borderRadius: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    marginBottom: 10,
    padding:10,
    
  },
  modalButtonText: {
    fontSize: 16,
    borderColor:'#ffffff',
    borderWidth:3,
    borderRadius:30,
    textAlign: 'center',
fontFamily:'OpenSansSemiBold',
paddingVertical: 10,
paddingHorizontal: 20,
  },
  noResults: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

export default FollowingScreen;
