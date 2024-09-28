import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity, Text, ScrollView } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
// import { LinearGradient } from 'react-native-linear-gradient';  
import plusIcon from '../../assets/icons/plus-icon.js';
import circleIcon from '../../assets/icons/circle-icon.js';
import ava from '../../assets/images/avatar.png';
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

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={styles.animatedContainer}
        entering={SlideInDown}
        exiting={SlideOutDown}
      >
        {/* <LinearGradient
          colors={['rgba(129, 143, 115, 0.06)', 'rgba(0, 0, 0, 0.2)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.firstGradient}
        >
          <LinearGradient
            colors={['#738F81', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.secondGradient}
          > */}
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <View style={styles.avatarContainer}>
                <Image source={ava} style={styles.avatar} />
                <TouchableOpacity style={styles.containerPlus}>
                  <SvgXml style={styles.icon1} xml={circleIcon} />
                  <SvgXml style={styles.icon2} xml={plusIcon} />
                </TouchableOpacity>
                <Text style={styles.username}>Thm</Text>

                <View style={styles.followContainer}>
                  <Text style={styles.followText}>8</Text>
                  <View style={styles.space}></View>
                  <Text style={styles.followText}>800</Text>
                </View>
                <View style={styles.followContainer2}>
                  <Text style={styles.followText}>Following</Text>
                  <View style={styles.space2}></View>
                  <Text style={styles.followText}>Followers</Text>
                </View>
              </View>

              <View style={styles.section}>
                <View>
                  <SvgXml style={styles.icon} xml={peopleIcon}/>
                <Text style={styles.sectionTitle}>General</Text>
                </View>
                <View style={styles.box}>
                <TouchableOpacity style={styles.option}>
                <SvgXml style={styles.icon3} xml={phoneIcon}/>
                  <Text style={styles.optionText}>Change phone number</Text>
                  <SvgXml style={styles.iconNext} xml={nextIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                <SvgXml style={styles.icon3} xml={mailIcon}/>
                  <Text style={styles.optionText}>Change email address</Text>
                  <SvgXml style={styles.iconNext} xml={nextIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <SvgXml style={styles.icon3} xml={passIcon}/>
                  <Text style={styles.optionText}>Change password</Text>
                  <SvgXml style={styles.iconNext} xml={nextIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                <SvgXml style={styles.icon3} xml={signatureIcon}/>
                  <Text style={styles.optionText}>Change name</Text>
                  <SvgXml style={styles.iconNext} xml={nextIcon}/>
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
                <TouchableOpacity style={styles.option}>
                <SvgXml style={styles.icon3} xml={signoutIcon}/>
                  <Text style={styles.optionText}>Sign Out</Text>
                  <SvgXml style={styles.iconNext} xml={nextIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                <SvgXml style={styles.icon3} xml={deleteIcon}/>
                  <Text style={styles.optionText}>Delete account</Text>
                  <SvgXml style={styles.iconNext} xml={nextIcon}/>
                </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          {/* </LinearGradient>
        </LinearGradient> */}
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
    width: 200,
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
    fontFamily: 'OpenSansBold',
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
