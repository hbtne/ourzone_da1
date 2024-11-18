import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import backIcon from '../../../assets/icons/back-icon';
import {getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential, sendSignInLinkToEmail } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';


const ChangeEmailScreen = ({ navigation }) => {
 
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
  
    const auth = getAuth();
    const db = getFirestore();
    const currentUser = auth.currentUser;
  
   
    const sendVerificationLink = async () => {
      try {
        const actionCodeSettings = {
          url: 'https://yourapp.com/profile', 
          handleCodeInApp: true,
        };
        await sendSignInLinkToEmail(auth, mail, actionCodeSettings);
        Alert.alert('Verification Link Sent', 'Please check your new email for verification link.');
      } catch (error) {
        console.error('Error sending verification link:', error);
        Alert.alert('Error', 'Failed to send verification link.');
      }
    };
  
    // Hàm xử lý thay đổi email
    const handleEmailChange = async () => {
      if (!mail || !password) {
        Alert.alert('Error', 'Please fill in both fields.');
        return;
      }
  
      setLoading(true);
  
      try {
       
        const credential = EmailAuthProvider.credential(currentUser.email, password);
        await reauthenticateWithCredential(currentUser, credential);
  
        
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, { pendingEmail: mail });
  
     
        await sendVerificationLink(auth, mail);
  
        Alert.alert(
          'Verification Required',
          'Please verify your new email. Once verified, log in with your new email.'
        );
  
        navigation.navigate('Profile');
  
      } catch (error) {
        console.error('Error updating email:', error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <View style={styles.dialogContainer}>
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => { navigation.navigate('Profile') }}
          >
            <SvgXml style={styles.iconBack} xml={backIcon} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit your email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your new email"
            placeholderTextColor="#838C82"
            value={mail}
            onChangeText={setMail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password to confirm"
            placeholderTextColor="#838C82"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleEmailChange} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.saveButtonText}>Save</Text>
            )}
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
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
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
    fontFamily: 'Montserrat-Bold',
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
  backContainer: {
    position: 'absolute',
    width: 13,
    height: 24,
    top: 25,
    left: 10,
  },
});

export default ChangeEmailScreen;
