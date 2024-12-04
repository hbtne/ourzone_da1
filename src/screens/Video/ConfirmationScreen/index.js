// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import styles from './styles';
// import FlashIcon from '../../../../assets/icons/FlashIcon';
// import DoneButton from '../../../components/DoneButton/index';
// import DownloadIcon from '../../../../assets/icons/DownloadIcon';
// import BackIcon from '../../../../assets/icons/BackIcon';
// import { useNavigation } from '@react-navigation/native';
// const ConfirmationScreen = () => {
//     const navigation = useNavigation();
//     return (
//         <View style={styles.container}>
           
//            <TouchableOpacity 
//                 style={styles.backIconContainer}
//                 onPress={() => navigation.goBack()} 
//             >
//                 <BackIcon />
//             </TouchableOpacity>

        

//             <View style={styles.footerContainer}>
//              <DoneButton onPress={() => navigation.navigate('VideoStack', { screen: 'AddCaption' })} />


     
//             </View>
//         </View>
//     );
// };

// export default ConfirmationScreen;
import React from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DoneButton from '../../../components/DoneButton';
import BackIcon from '../../../../assets/icons/BackIcon';
import styles from './styles';
import { Video } from 'expo-av'; // Đảm bảo import Video từ expo-av


const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { videoUri } = route.params || {};
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
        <BackIcon />
      </TouchableOpacity>

      <Video

        source={{ uri: videoUri }}
        style={styles.videoPlayer}
        resizeMode="contain"
        shouldPlay
        isLooping
        ResizeMode="cover" 
        useNativeControls
      />

      <View style={styles.footerContainer}>
        <DoneButton onPress={() =>  navigation.navigate('VideoStack', {
        screen: 'AddCaption',
        params: { videoUri: videoUri}
      })} />
      </View>
    </View>
  );
};

export default ConfirmationScreen;
