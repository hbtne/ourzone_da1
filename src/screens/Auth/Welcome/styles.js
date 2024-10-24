import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Lấy kích thước màn hình

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    zoneContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 90,
        top: 30, 
    },
    logoTextOur: {
        fontFamily: 'OtomanopeeOne-Regular',
        fontSize: 106,
        color: '#FFFFFF',
        letterSpacing: -0.02,
        textAlign: 'left', 
        marginBottom: -50,
        alignSelf: 'flex-start', 
        
    },
    
    logoMainText: {
        fontFamily: 'OtomanopeeOne-Regular',
        fontSize: 106,
        color: '#738F81',
        letterSpacing: -0.02,
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        marginLeft: 0, 
        
    },
    logoStrokeTextZone: {
        fontFamily: 'OtomanopeeOne-Regular',
        fontSize: 106,
        color: '#FFFFFF',
        letterSpacing: -0.02,
        textAlign: 'center',
        position: 'absolute',
        zIndex: 0, 
      
        left: 0,
        textShadowColor: '#FFFFFF',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    buttonSignUp: {
        width: 334,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#738F81',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
    },
    buttonTextSignUp: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 24,
        fontWeight: '800',
        color: '#738F81',
    },
    buttonSignIn: {
        width: 334,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'transparent',
        borderColor: '#738F81',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#738F81',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
    },
    buttonTextSignIn: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
    },
});

export default styles;
