// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#51645A', // Màu nền xanh nhạt
    padding: 10,
    borderRadius: 25,
    overflow: 'hidden', // Đảm bảo chữ không bị tràn ra ngoài
  },
  iconContainer: {
    marginRight: 10,
  },
  songName: {
    fontSize: 16,
    color: '#000', // Màu chữ
  },
});

export default styles;
