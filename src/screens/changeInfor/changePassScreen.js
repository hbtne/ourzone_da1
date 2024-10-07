import react, {useState} from "react";
import { View, tyleSheet, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";
import { SvgXml } from 'react-native-svg';
import backIcon from '../../../assets/icons/back-icon';

const changePassScreen = ({navigation}) => {
    const [currentPassword,setCurrentPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    return (
  <View style={styles.container}>
    {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}>  */}
      <View style={styles.borderContainer}>
        <View style={styles.dialogContainer}>
        <TouchableOpacity style={styles.backContainer} onPress={()=>{navigation.navigate('profileScreen')}}>
            <SvgXml style={styles.iconBack} xml={backIcon}/>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit your password</Text>
          <View style={styles.input}>
          <TextInput
              placeholder="Enter your current password"
              placeholderTextColor="#838C82"
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
  </View>
  <View style={styles.input}>
          <TextInput
              placeholder="Enter your new password"
              placeholderTextColor="#838C82"
              value={newPassword}
              onChangeText={setNewPassword}
            />
  </View>
  <View style={styles.input}>
          <TextInput
              placeholder="Confirm your new password"
              placeholderTextColor="#838C82"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
  </View>
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
  top: -15,
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
  fontFamily:'OpenSansBold'
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
  fontFamily: 'OpenSansSemiBold',

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

export default changePassScreen;