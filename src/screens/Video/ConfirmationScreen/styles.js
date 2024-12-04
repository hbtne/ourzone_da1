import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start', 
      alignItems: 'center',
      backgroundColor: '#191919',
    },
    backIconContainer: {
      position: 'absolute', 
      top: 35, 
      left: 20, 
      zIndex: 1,
    },
    footerContainer: {
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      zIndex: 2, // Đảm bảo footer nằm trên video
      flexDirection: 'row',
      justifyContent: 'center',
    },
    videoPlayer: {
      width: '100%',
      height: '100%',      // Video sẽ chiếm toàn bộ màn hình
      position: 'absolute', // Đặt video lên đầu trang
      top: 0,
      left: 0,
    },
  });
  

export default styles;
