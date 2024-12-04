// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#51645A', 
    padding: 10,
    borderRadius: 25,
    overflow: 'hidden', 
    whiteSpace: 'nowrap', 
  },
  iconContainer: {
    marginRight: 10,
  },

  songName: {
    fontSize: 16,
    color: '#000',
    marginLeft: 150,

    fontFamily: 'Montserrat-Regular',

  },
});

export default styles;
