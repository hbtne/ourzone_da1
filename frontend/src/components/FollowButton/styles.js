import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  followedButton: {
    backgroundColor: '#A4C8B3', // Màu nền khi đã follow
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  followedText: {
    color: 'black', // Màu chữ khi đã follow
  },
});

export default styles;
