import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import ava from '../../assets/images/avatarcircle.png';
import searchIcon from '../../assets/icons/search-icon';
import { db, auth } from '../../firebase/firebase';
import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';

const SearchScreen = () => {
  const [allResults, setAllResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isFollowed: doc.data().followersList?.includes(auth.currentUser.uid) || false, // Kiểm tra trạng thái follow
        }));
        setAllResults(usersList);
        setSearchResults(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearchChange = (text) => {
    setSearchTerm(text);
    const filteredResults = allResults.filter((result) =>
      result.name && result.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleFollow = async (index, userIdToFollow) => {
    const updatedResults = [...searchResults];
    updatedResults[index].isFollowed = !updatedResults[index].isFollowed;
    setSearchResults(updatedResults);

    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', userIdToFollow); // Tài khoản được theo dõi
        const currentUserDocRef = doc(db, 'users', currentUser.uid); // Tài khoản của người dùng hiện tại

        if (updatedResults[index].isFollowed) {
          await updateDoc(userDocRef, {
            followersList: arrayUnion(currentUser.uid),
            follower: increment(1),
          });

          await updateDoc(currentUserDocRef, {
            followingsList: arrayUnion(userIdToFollow),
            following: increment(1),
          });
        } else {
          await updateDoc(userDocRef, {
            followersList: arrayRemove(currentUser.uid),
            follower: increment(-1),
          });

          await updateDoc(currentUserDocRef, {
            followingsList: arrayRemove(userIdToFollow),
            following: increment(-1),
          });
        }

        console.log(
          `User ${currentUser.uid} ${updatedResults[index].isFollowed ? 'followed' : 'unfollowed'} ${userIdToFollow}`
        );
      } catch (error) {
        console.error('Error following/unfollowing user:', error);
      }
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.resultItem}>
      <Image source={item.avatar ? { uri: item.avatar } : ava} style={styles.avatar} />
      <Text style={styles.resultName}>{item.name}</Text>
      <TouchableOpacity
        style={[styles.button, item.isFollowed ? styles.followed : styles.follow]}
        onPress={() => handleFollow(index, item.id)}
      >
        <Text style={styles.text}>{item.isFollowed ? 'Followed' : 'Follow'}</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.nameScreen}>Search</Text>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor="#ccc"
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
        <SvgXml style={styles.iconSearch} xml={searchIcon} />
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text style={styles.noResults}>No users found</Text>}
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
  nameScreen: {
    fontFamily: 'Montserrat-Bold',
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
    fontFamily: 'Montserrat-SemiBold',
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
fontFamily:'Montserrat-SemiBold',
paddingVertical: 10,
paddingHorizontal: 20,
  },
  noResults: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

export default SearchScreen;