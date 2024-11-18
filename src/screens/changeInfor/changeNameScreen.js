import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { SvgXml } from 'react-native-svg';
import backIcon from '../../../assets/icons/back-icon';

const ChangeNameScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  // Initialize Firebase Auth and Firestore
  const auth = getAuth();
  const db = getFirestore();

  // Function to handle name change
  const handleSaveName = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'No user is logged in');
      return;
    }

    if (!name.trim()) {
      Alert.alert('Invalid Input', 'Please enter a valid name');
      return;
    }

    try {
     
      const userDocRef = doc(db, 'users', user.uid);

      await updateDoc(userDocRef, { name });

      Alert.alert('Success', 'Name updated successfully');
      navigation.navigate('Profile'); 
    } catch (error) {
      console.error('Error updating name:', error);
      Alert.alert('Error', 'Failed to update name. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <View style={styles.dialogContainer}>
          <TouchableOpacity style={styles.backContainer} onPress={() => navigation.navigate('Profile')}>
            <SvgXml style={styles.iconBack} xml={backIcon} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit your name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#838C82"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveName}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  borderContainer: {
    width: 330,
    height: 260,
    // backgroundColor: '#ffffff',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  dialogContainer: {
    width: 300,
    backgroundColor: '#1E1E1E',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#6B9080',
  },
  modalTitle: {
    color: '#8EA085',
    fontSize: 22,
    marginBottom: 20,
    fontFamily:'Montserrat-Bold'
  },
  input: {
    width: '100%',
    backgroundColor: '#2C2C2C',
    borderRadius: 21,
    borderWidth: 0.5,
    borderColor: '#ffffff',
    padding: 10,
    marginBottom: 20,
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#6B9080',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  iconBack: {
    position: 'absolute',
    width: 22,
    height: 22,
  },
  backContainer:
  {
    position: 'absolute',
    width: 13,
    height: 24,
    top: 25,
    left: 10,
  }
});

export default ChangeNameScreen;