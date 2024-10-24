import React from 'react';
import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import styles from './styles';
import FlashIcon from '../../../../assets/icons/FlashIcon';
import DownloadButton from '../../../components/DownloadButton/index';
import DownloadIcon from '../../../../assets/icons/DownloadIcon';
import BackIcon from '../../../../assets/icons/BackIcon';
import { useNavigation } from '@react-navigation/native';
import InsertCaptionIcon from '../../../../assets/icons/InsertCaptionIcon';
import InsertMusicIcon from '../../../../assets/icons/InsertMusicIcon';

const AddCaptionScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
          
          <TouchableOpacity 
                style={styles.backIconContainer}
                onPress={() => navigation.goBack()} 
            >
                <BackIcon />
            </TouchableOpacity>
            <View style={styles.captionContainer}>
                <View style={styles.splitBar}></View>
                <View style={styles.caption} >
                    <TouchableOpacity >
                        <InsertCaptionIcon style={styles.icon} />
                    </TouchableOpacity>
                    <TextInput style={styles.text} placeholder='Add a caption for your post'    
                    multiline={true}
                    numberOfLines={4} 
                    maxLength={100} 
                    textAlignVertical="top"
                    placeholderTextColor="#FFFFFF" ></TextInput>

                </View>
                <View style={styles.splitBar}></View>
                <View style={styles.caption} >
                    <TouchableOpacity >
                        <InsertMusicIcon style={styles.icon} />
                    </TouchableOpacity>
                    <TextInput 
                    placeholder='Add some music for your post' 
                    multiline={true}
                    numberOfLines={4} 
                    maxLength={100} 
                    textAlignVertical="top"
                    placeholderTextColor="#FFFFFF" ></TextInput>

                </View>
                <View style={styles.splitBar}></View>
            </View>

            <View style={styles.footerContainer}>

                <DownloadButton  onPress={() => navigation.navigate('Add')} />
     
            </View>
        </View>
    );
};

export default AddCaptionScreen;
