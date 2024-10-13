import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8, // khoảng cách giữa biểu tượng và tiêu đề
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end', // canh phải
    marginVertical: 20,
  },
  interactionButtons: {
    flexDirection: 'column', // Sắp xếp dọc
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120, // Đảm bảo có đủ không gian cho các button
    paddingVertical: 10, // Khoảng cách giữa các button
  },
  buttonContainer: {
    alignItems: 'center', // Canh giữa các button và text
  },
  countText: {
    color: '#fff', // Màu chữ cho số lượng
    marginTop: 5, // Khoảng cách giữa icon và số lượng
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
