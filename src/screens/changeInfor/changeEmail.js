import React, { useState } from 'react';
import { ImageBackground, View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import backIcon from '../../../assets/icons/back-icon';
import { SvgXml } from 'react-native-svg';

const ChangeEmailScreen = ({ navigation }) => {
  const [mail, setMail] = useState(''); 
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}>  */}
        <View style={styles.borderContainer}>
          <View style={styles.dialogContainer}>
          <TouchableOpacity style={styles.backContainer} onPress={()=>{navigation.navigate('Profile')}}>
              <SvgXml style={styles.iconBack} xml={backIcon}/>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit your email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#838C82"
              value={mail}
              onChangeText={setMail}
            />
            <TouchableOpacity
              style={styles.saveButton}>
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

export default ChangeEmailScreen;