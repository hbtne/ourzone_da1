import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    width: width,
    backgroundColor: 'transparent', 
  },
  video: {
    zIndex: -1,
    width:width,

    height: height-10,
  },

  overlayContainer: {
    position: 'absolute',
    bottom: 90,
    left: 10,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  channelName: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    marginVertical: 12,
    paddingEnd:12,
    paddingBottom:5,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
    fontFamily: 'Montserrat-Regular',
  },
  musicName: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Montserrat-Regular',
  },
  interactionContainer: {
    position: 'absolute',
    right: 10,
    bottom: 250,
    alignItems: 'center',
  },
  buttonContainer: {
    
    marginBottom: 20,
    alignItems: 'center',
  },
  moreButton: {
    position: 'absolute',
    right: 10,
    top: 230,
  },
  countText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default styles;
