import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import ava from '../../assets/images/avatar.png';

import searchIcon from '../../assets/icons/search-icon';

const SearchScreen = () => {

  const allResults = [
    { type: 'user', name: 'Tento', isFollowed: false },
    { type: 'user', name: 'TM', isFollowed: false },
    { type: 'hashtag', name: 'Totincau' },
  ];


  const [searchResults, setSearchResults] = useState(allResults);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <Text style={styles.nameScreen}>Search</Text>
      <View style={styles.searchBar}>
      <TextInput
        style={styles.searchBar1}
        placeholder="Search..."
        value={searchTerm}
        onChangeText={handleSearchChange}>
        </TextInput>
        <SvgXml style={styles.iconSearch} xml={searchIcon}/>
        </View>

      {/* Danh sách kết quả tìm kiếm */}
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.resultItem}>
            {item.type === 'user' ? (
              <Image
                source={ava} 
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatar}>
              <Text style={styles.hashtagIcon}>#</Text>
              </View>
            )}
         
            <Text style={styles.resultName}>{item.name}</Text>

 
            {item.type === 'user' && (
            //   <TouchableOpacity
            //     style={styles.button}
            //     onPress={() => toggleFollow(index)}
            //   >
            //     <Text style={styles.followButtonText}>
            //       {item.isFollowing ? 'Follow' : 'Followed'}
            //     </Text>
            // </TouchableOpacity> 
             <TouchableOpacity
            style={[styles.button, item.isFollowed ? styles.followed : styles.follow]}
            onPress={() => toggleFollow(index)}>
            <Text style={styles.text}>{item.isFollowed ? '   Followed' : '     Follow'}</Text>
          </TouchableOpacity>
          
            )}

            {/* Nút X để xóa kết quả */}
            <TouchableOpacity onPress={() => removeResult(index)}>
              <Text style={styles.removeButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.noResults}>No results found</Text>
        )}
      />
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
  nameScreen:
  {
fontFamily:'OpenSansBold',
fontSize:30,
color:'#738F81',
  },
  searchBar: {
    height:45,
    width:'90%',
    borderRadius: 30,
    color: '#ffffff',
    backgroundColor:'rgba(115, 143, 129, 0.5)',
    marginTop:10,
    marginBottom:20,
    marginLeft:15,
  },
  searchBar1: {
    padding: 10,
    marginLeft:30,
    color: '#ffffff',
  },
  button: {
    paddingVertical: 7,
    // paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 2,
    // marginLeft:100,
    // marginTop:30,
    // marginBottom:30,
    width:'32%',
    alignContent:'center',
  },
  follow: {
   
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  followed: {
    borderColor: 'white',
    backgroundColor: '#708F7B', 
  },
  iconSearch:
  {
    bottom:32,
    left:10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'rgba(115, 143, 129, 0.7)',
    padding: 15,
    borderRadius: 35,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 90,
    marginRight: 10,
    backgroundColor:'#000000',
    alignItems: 'center',
borderColor:'#708F7B',
borderWidth: 4,


  },
  hashtagIcon: {
    fontSize: 25,
    marginRight: 10,
    color: '#fff',
  },
  resultName: {
    flexGrow: 1,
    color: '#fff',
    fontFamily:'OpenSansSemiBold'
  },
  followButton: {
    backgroundColor: '#0a84ff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  followButtonText: {
    color: '#fff',
  },
  removeButton: {
    // backgroundColor: '#ff3b30',
    padding: 5,
    borderRadius: 5,
    color: '#fff',
    marginLeft: 10,
  },
  noResults: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  text: {
    color: 'white',
    // fontSize: 18,
  },
});

export default SearchScreen;
