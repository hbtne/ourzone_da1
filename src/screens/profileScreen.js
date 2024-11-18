import {  doc, getDoc, updateDoc } from 'firebase/firestore';
import {  ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useCallback } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
import { deleteUser,signOut  } from 'firebase/auth';
import { deleteDoc} from 'firebase/firestore';
import {auth, db, storage } from '../../firebase/firebase.js'; 
import plusIcon from '../../assets/icons/plus-icon.js';
import circleIcon from '../../assets/icons/circle-icon.js';
import peopleIcon from '../../assets/icons/people-icon.js';
import groupIcon from '../../assets/icons/group-icon.js';
import inforIcon from '../../assets/icons/infor-icon.js';
import passIcon from '../../assets/icons/pass-icon.js';
import phoneIcon from '../../assets/icons/phone-icon.js';
import mailIcon from '../../assets/icons/mail-icon.js';
import signatureIcon from '../../assets/icons/signature-icon.js';
import shareIcon from '../../assets/icons/share-icon.js';
import termIcon from '../../assets/icons/term-icon.js';
import reportIcon from '../../assets/icons/report-icon.js';
import signoutIcon from '../../assets/icons/signout-icon.js';
import deleteIcon from '../../assets/icons/delete-icon.js';
import nextIcon from '../../assets/icons/next-icon.js';

const ProfileScreen = () => {
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState('');
  const [follower, setFollower] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name || 'User');
          setAvatar(userData.avatar || '');
          setFollower(userData.follower ?? '0');
          setFollowing(userData.following ?? '0');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const imageUri = pickerResult.assets[0].uri;
      setSelectedImage(imageUri);
      await uploadImageToFirebase(imageUri);
    }
  };

  const uploadImageToFirebase = async (uri) => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = ref(storage, `avatars/${user.uid}/${Date.now()}`);
      await uploadBytes(imageRef, blob);
      const downloadUrl = await getDownloadURL(imageRef);
      await updateUserAvatar(downloadUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Error", "Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateUserAvatar = async (url) => {
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, { avatar: url });
      setAvatar(url);
      fetchUserData();
    } catch (error) {
      console.error("Error updating user avatar:", error);
      Alert.alert("Update Error", "Failed to update user avatar. Please try again.");
    }
  };
  

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('logout');
      navigation.navigate('Welcome'); 
    } catch (error) {
      console.error('Sign Out Error:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };
  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
  
    if (!user) {
      Alert.alert('Error', 'No user is currently signed in.');
      return;
    }
      Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel', 
        },
        {
          text: 'Delete',
          style: 'destructive', 
          onPress: async () => {
            try {
              const userDocRef = doc(db, 'users', user.uid);
              await deleteDoc(userDocRef);
  
              const avatarFolderRef = ref(storage, `avatars/${user.uid}`);
              const folderFiles = await listAll(avatarFolderRef);
              const deletePromises = folderFiles.items.map((fileRef) => deleteObject(fileRef));
              await Promise.all(deletePromises);
  
              await deleteUser(user);
  
              Alert.alert('Success', 'Your account has been deleted.');
              navigation.navigate('Welcome'); 
            } catch (error) {
              Alert.alert('Success', 'Your account has been deleted.');
              navigation.navigate('Welcome'); 
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.animatedContainer} entering={SlideInDown} exiting={SlideOutDown}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={styles.avatarContainer}>
          {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <Image source={{ uri: 'https://via.placeholder.com/120' }} style={styles.avatar} />
            )}         
              <TouchableOpacity style={styles.containerPlus} onPress={handleImagePicker}>
              <SvgXml style={styles.icon1} xml={circleIcon} />
              <SvgXml style={styles.icon2} xml={plusIcon} />
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color="#007AFF" />}

            <Text style={styles.username}>{userName}</Text>

            <View style={styles.followContainer}>
              <Text style={styles.followText}>{following}</Text>
              <View style={styles.space}></View>
              <Text style={styles.followText}>{follower}</Text>
            </View>
            <View style={styles.followContainer2}>
              <Text style={styles.followText}>Following</Text>
              <View style={styles.space2}></View>
              <Text style={styles.followText}>Followers</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View>
              <SvgXml style={styles.icon} xml={peopleIcon} />
              <Text style={styles.sectionTitle}>General</Text>
            </View>
            <View style={styles.box}>
              <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangeInfoStack', { screen: 'ChangePhoneNum' })}>
                <SvgXml style={styles.icon3} xml={phoneIcon} />
                <Text style={styles.optionText}>Change phone number</Text>
                <SvgXml style={styles.iconNext} xml={nextIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangeInfoStack', { screen: 'ChangeMailScreen' })}>
                <SvgXml style={styles.icon3} xml={mailIcon} />
                <Text style={styles.optionText}>Change email address</Text>
                <SvgXml style={styles.iconNext} xml={nextIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangeInfoStack', { screen: 'ChangePassScreen' })}>
                <SvgXml style={styles.icon3} xml={passIcon} />
                <Text style={styles.optionText}>Change password</Text>
                <SvgXml style={styles.iconNext} xml={nextIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangeInfoStack', { screen: 'ChangeName' })}>
                <SvgXml style={styles.icon3} xml={signatureIcon} />
                <Text style={styles.optionText}>Change name</Text>
                <SvgXml style={styles.iconNext} xml={nextIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
                <View>
                <SvgXml style={styles.icon} xml={groupIcon}/>
                <Text style={styles.sectionTitle}>Community</Text>
                </View>
                <View style={styles.box}>
                <TouchableOpacity style={styles.option}>
                <SvgXml style={styles.icon3} xml={shareIcon}/>
                  <Text style={styles.optionText}>Share OurZone</Text>
                  <SvgXml style={styles.iconNext} xml={nextIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                <SvgXml style={styles.icon3} xml={termIcon}/>
                  <Text style={styles.optionText}>Terms of Service</Text>
                  <SvgXml style={styles.iconNext} xml={nextIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                <SvgXml style={styles.icon3} xml={reportIcon}/>
                  <Text style={styles.optionText}>Report a problem</Text>
                  <SvgXml style={styles.iconNext} xml={nextIcon}/>
                </TouchableOpacity>
                </View>
              </View>

              <View style={styles.section}>
                <View>
                <SvgXml style={styles.icon} xml={inforIcon}/>
                <Text style={styles.sectionTitle}>Manage</Text>
                </View>
                <View style={styles.box}>
                <TouchableOpacity style={styles.option} onPress={handleSignOut}>
                <SvgXml style={styles.icon3} xml={signoutIcon}/>
                  <Text style={styles.optionText}>Sign Out</Text>
                  <SvgXml style={styles.iconNext} xml={nextIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}  onPress={handleDeleteAccount}>
                <SvgXml style={styles.icon3} xml={deleteIcon}/>
                  <Text style={styles.optionText}>Delete account</Text>
                  <SvgXml style={styles.iconNext} xml={nextIcon}/>
                </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
  },
  animatedContainer: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#738F81',
  },
  containerPlus: {
    position: 'absolute',
    top: 90,
    right: 130,
    
  },

  iconNext: {
    position: 'absolute',
    marginTop:20,
    marginLeft:295,
    width: 24,
    height: 24,
  },

  icon1: {
    width: 32,
    height: 32,
    backgroundColor: '#ffffff',
    borderRadius: 30,
  },
  icon2: {
    position: 'absolute',
    top: 8,
    left: 9,
    width: 24,
    height: 24,
  },
  icon: {
    position: 'absolute',
    marginTop:4,
    width: 24,
    height: 24,
  },

  icon3: {
    position: 'absolute',
    marginTop:20,
    marginLeft:10,
    width: 24,
    height: 24,
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
    fontFamily:'Montserrat-SemiBold',
  },

  space:
  {
    width: 24,
  },

space2:
{
  width: 30,
},
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  box:
  {
    borderRadius: 20,
    backgroundColor:'#738F81'
  },


  sectionTitle: {
    color: '#6B9080',
    fontSize: 18,
    marginBottom: 10,
    marginLeft:25,
    fontFamily: 'Montserrat-Bold',
  },
  option: {
    backgroundColor: '#738F81',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginBottom: 10,
  },
  optionText: {
    color: '#FFFFFF', 
    fontSize: 16,
    marginLeft:23,
  },

});
export default ProfileScreen; 