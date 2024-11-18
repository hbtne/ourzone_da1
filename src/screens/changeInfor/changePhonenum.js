import React, { useState } from 'react';
import { ImageBackground, View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import backIcon from '../../../assets/icons/back-icon';
import { SvgXml } from 'react-native-svg';
import PhoneInput from 'react-native-phone-input';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const changePhoneNum = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

  const auth = getAuth();
  const db = getFirestore();

  const handleSavePhone = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'No user is logged in');
      return;
    }

    if (!phoneNumber.trim()) {
      Alert.alert('Invalid Input', 'Please enter a valid phone');
      return;
    }

    try {
     
      const userDocRef = doc(db, 'users', user.uid);

      await updateDoc(userDocRef, { phone});

      Alert.alert('Success', 'Phone updated successfully');

      navigation.navigate('Profile'); 
    } catch (error) {
      console.error('Error updating phone:', error);
      Alert.alert('Error', 'Failed to update phone. Please try again.');
    }
  };
      return (
    <View style={styles.container}>
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}>  */}
        <View style={styles.borderContainer}>
          <View style={styles.dialogContainer}>
          <TouchableOpacity style={styles.backContainer} onPress={()=>{navigation.navigate('Profile')}}>
              <SvgXml style={styles.iconBack} xml={backIcon}/>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit phone number</Text>
            <View style={styles.input}>
      <PhoneInput
        value={phoneNumber}
        onChangePhoneNumber={setPhoneNumber}
        initialCountry={'vn'} 
        textStyle={{ fontSize: 16, letterSpacing: 2,color:'#ffffff' }}
        flagStyle={{ width: 30, height: 20 }}
      />
    </View>
            <TouchableOpacity
              style={styles.saveButton} onPress={handleSavePhone}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      {/* </ImageBackground> */}
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
    width: 340,
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
    height:'50',
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
    width: 20,
    height: 20,
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

export default changePhoneNum;