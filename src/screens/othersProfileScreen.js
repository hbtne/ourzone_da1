import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';

import ava from '../../assets/images/avatarcircle.png';
import nextIcon from '../../assets/icons/next-icon.js';
import chatIcon from '../../assets/icons/chat-icon.js';
import backIcon from '../../assets/icons/back-icon.js';

const OthersProfileScreen = ({ route, navigation }) => {
  const { userId } = route.params; // Get user ID from navigation parameters
  const [userData, setUserData] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setIsFollowed(data.followersList?.includes(auth.currentUser.uid) || false); // Check if the current user follows them
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const toggleFollow = async () => {
    setIsFollowed(!isFollowed);
  };

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading user data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.goBack()}
        >
          <SvgXml style={styles.iconBack} xml={backIcon} />
        </TouchableOpacity>
        <Text style={styles.nameAcc}>{userData.name}</Text>
        <TouchableOpacity
  style={styles.chat}
  onPress={() =>
    navigation.navigate('ChatStack', {
      screen: 'ChatScreen',
      params: {
        userId: auth.currentUser.uid,
        receiverId: userId,
        receiverName: userData.name,
        receiverAvatar: userData.avatar || null,
      },
    })
  }
>
          <SvgXml style={styles.iconBack} xml={chatIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        <Image
          source={userData.avatar ? { uri: userData.avatar } : ava}
          style={styles.avatar}
        />
        <Text style={styles.username}>{userData.name}</Text>
        <View style={styles.followContainer}>
          <Text style={styles.followText}>{userData.following || 0}</Text>
          <View style={styles.space}></View>
          <Text style={styles.followText}>{userData.follower || 0}</Text>
        </View>
        <View style={styles.followContainer2}>
          <Text style={styles.followText}>Following</Text>
          <View style={styles.space2}></View>
          <Text style={styles.followText}>Followers</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, isFollowed ? styles.followed : styles.follow]}
        onPress={toggleFollow}
      >
        <Text style={styles.text}>{isFollowed ? 'Followed' : 'Follow'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Check out their posts</Text>
        <SvgXml style={styles.iconNext} xml={nextIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Copy link to this profile</Text>
        <SvgXml style={styles.iconNext} xml={nextIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Report a problem</Text>
        <SvgXml style={styles.iconNext} xml={nextIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', 
      },
      iconNext: {
        position: 'absolute',
        marginTop:20,
        marginLeft:295,
        width: 24,
        height: 24,
      },
      backContainer:
      {
        position: 'absolute',
        width: 13,
        height: 24,
        top: 45,
        left: 10,
      },
      nameAcc:
      {
        position: 'absolute',
color:'#ffffff',
top:40,
left:150,
fontFamily:'OpenSansBold',
fontSize:24,

      },
      iconBack: {
        position: 'absolute',
        width: 20,
        height: 20,
      },
      chat:{
        position: 'absolute',
      top:48,
      left:310,
      },
      avatarContainer: {
        
        alignItems: 'center',
        marginTop: 90,
      },
      avatar: {
        width: 140,
        height: 140,
        borderRadius: 90,
        borderWidth: 6,
        borderColor: '#738F81',
      },
      option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#708F7B', 
        marginVertical: 5,
      },
      optionText: {
        color: 'white',
        fontSize: 16,
        fontFamily:'OpenSansSemiBold',

      },
      username: {
        marginTop: 10,
        fontSize: 20,
        color: '#FFFFFF', 
      },
      followContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 130,
        marginTop: 10,
      },
    
      followContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
        marginTop: 10,
      },
      followText: {
        color: '#FFFFFF', 
        fontSize: 14,
        fontFamily:'OpenSansSemiBold',
      },
    
      space:
      {
        width: 24,
      },
    
    space2:
    {
      width: 40,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        borderWidth: 2,
        marginLeft:100,
        marginTop:30,
        marginBottom:30,
        width:'42%',
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
      text: {
        color: 'white',
        fontSize: 18,
      },
});

export default OthersProfileScreen;