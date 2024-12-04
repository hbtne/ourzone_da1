import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#191919',
    },
    title: {
        color: 'white',
        marginVertical: 40,
    },
    backIconContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1, 
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginTop: 'auto',
        paddingBottom: 20,
    },
    icon: {
        alignItems: 'center',
    },
    splitBar: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(115, 143, 129, 0.7)',
        marginVertical:10,
        marginTop:10,
    },
    captionContainer: {
        position: 'absolute',
        bottom: 100,
        flexDirection: 'column',
        width: '100%',
        marginHorizontal:30,
        marginVertical:30,
        
    },
    text: {
        color: '#ffffff',
        fontFamily: 'Montserrat-Regular',
        flexWrap: 'wrap',
    },
    caption: {
        flexDirection: 'column',
        marginLeft:30,
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
