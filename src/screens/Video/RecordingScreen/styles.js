// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-start', 
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: '#191919',
//     },
//     title: {
//         color: 'white',
//         marginVertical: 40, 
//     },
//     cancelIconContainer: {
//         position: 'absolute', 
//         top: 40, 
//         left: 20, 
//         zIndex: 1,
//     },
//     footerContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         width: '100%',
//         marginTop: 'auto', 
//         paddingBottom: 10,
//     },
//     iconContainer: {
//         alignItems: 'center',
//     },
//     rightButton: {
//         marginBottom: 5,
//     },
// });

// export default styles;
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#191919',
    },
  video: {
        flex: 1,
        alignItems: 'center',
      
    },
    title: {
        color: 'white',
        marginVertical: 40,
    },
    cancelIconContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    cameraControls : {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginTop: 'auto',
        paddingBottom: 10,
    },
    controlButton: {
        alignItems: 'center',
    },
    rightButton: {
        marginBottom: 5,
    },
    camera: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    video: {
        width: '100%',
        height: 300,
    },
});

export default styles;
