import { StyleSheet, Dimensions } from 'react-native';

const { width,height } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000', // Nền đen cho toàn bộ màn hình
      zIndex: 1, // Đặt zIndex thấp để các thành phần bên trên được ưu tiên
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 10, // Đảm bảo header hiển thị trên các thành phần khác
      padding: 10,
      position: 'absolute', // Cố định header ở phía trên
      top: 50,
      width: '100%',
    },
    leftHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontFamily: 'Montserrat-Bold',
      marginLeft: 8,
    },
    dropdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginLeft: 10,
    },
    dropdownTextStyle: {
      color: '#fff',
      fontSize: 16,
      marginRight: 8,
    },
    dropdownArrowStyle: {
      tintColor: '#fff',
    },
    dropdownStyle: {
      position: 'absolute',
      top: 50,
      left: 10,
      width: width - 20,
      backgroundColor: '#444',
      borderRadius: 8,
      padding: 10,
      zIndex: 20, // Đảm bảo dropdown hiển thị trên các thành phần khác
    },
    dropdownItem: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#555',
    },
    postContainer: {
      flex: 1, // Chiếm toàn bộ chiều cao còn lại
      backgroundColor: '#000',
      paddingBottom:50,
      
    },
  });
  
export default styles;
