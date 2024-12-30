import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    height: '80%', 
    backgroundColor: '#1c1c1c',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#fff',
    textAlign: 'center',

    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    height: '100%', 
  },
  scrollContent: {
    paddingBottom: 10, 
  },
  noCommentsText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  commentContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentTime: {
    color: '#888',
    fontSize: 12,
  },
  commentText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  repliesContainer: {
    marginLeft: 50,
  },
  replyContainer: {
    marginBottom: 10,
  },
  replyText: {
    color: '#ddd',
    fontSize: 14,
  },
  replyInput: {
    backgroundColor: '#2c2c2c',
    color: '#fff',
    borderRadius: 11,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 5,
  },
  replyButton: {
    backgroundColor: '#738F81',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  replyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  commentInput: {
    backgroundColor: '#2c2c2c',
    color: '#fff',
    borderRadius: 11,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: '#738F81',
    borderRadius: 5,
    padding: 10,
  },
  commentButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  closeButton: {
    marginBottom: 5,
    backgroundColor: '#ddd',
    padding: 3,
    borderRadius: 5,
    width:'30%',
    verticalAlign: 'center',
    alignSelf: 'center',


  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  showRepliesButton: {
    marginTop: 10,
    backgroundColor: '#738F81',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  showRepliesButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default styles;
