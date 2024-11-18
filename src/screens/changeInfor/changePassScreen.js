import react, {useState} from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert, ActivityIndicator } from "react-native";
import { SvgXml } from 'react-native-svg';
import backIcon from '../../../assets/icons/back-icon';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';


const ChangePassScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);

      await updatePassword(currentUser, newPassword);

      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, { password: newPassword });

      Alert.alert('Success', 'Password updated successfully!');
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error updating password:', error);
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'The current password is incorrect.');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Error', 'Too many attempts. Please try again later.');
      } else {
        Alert.alert('Error', 'Failed to update password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <View style={styles.dialogContainer}>
          <TouchableOpacity style={styles.backContainer} onPress={() => navigation.navigate('Profile')}>
            <SvgXml style={styles.iconBack} xml={backIcon} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit your password</Text>

          <View style={styles.input}>
            <TextInput
              placeholder="Enter your current password"
              placeholderTextColor="#838C82"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.input}>
            <TextInput
              placeholder="Enter your new password"
              placeholderTextColor="#838C82"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.input}>
            <TextInput
              placeholder="Confirm your new password"
              placeholderTextColor="#838C82"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword} disabled={loading}>
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

export default ChangePassScreen;