// styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Chiều rộng modal
    maxHeight: '100%', // Chiều cao tối đa
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  musicItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Dưới mỗi bài nhạc là đường viền
  },
  musicItemText: {
    fontSize: 16,
    color: '#333', // Màu chữ của tên bài nhạc
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#738F81',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default styles;
