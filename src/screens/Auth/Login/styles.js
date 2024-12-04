import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191919',
    },
    title: {
        position: 'absolute', 
        width: 330, 
        height: 49, 
        top: 180,
        fontFamily: 'Montserrat-Bold', 
        fontStyle: 'normal', 
        fontWeight: '800', 
        fontSize: 40, 
        lineHeight: 49, 
        textAlign: 'center', 
        color: '#738F81',
        textShadowColor: 'rgba(0, 0, 0, 0.25)', 
        textShadowOffset: { width: 0, height: 4 }, 
        textShadowRadius: 4,
    },
    rectangle: {
        position: 'absolute', 
        width: 350, 
        height: 200, 
        top: 300, 
        backgroundColor: 'rgba(115, 143, 129, 0.7)', 
        borderRadius: 40, 
    },
    checkboxContainer: {
        flexDirection: 'row', 
        alignItems: 'center',  
        position: 'absolute',
        left: 20, 
        top: 164,
    },
    checkbox: {
        width: 15,
        height: 16,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 4,
        backgroundColor: 'transparent', 
    },
    label: {
        fontFamily: 'Montserrat-SemiBold', 
        marginLeft: 8, 
        color: '#FFFFFF', 
        fontSize: 12, 
        marginLeft: 10, 
    },
    forgotPassword: {
        fontFamily: 'Montserrat-Regular', 
        left: 60, 
        fontSize: 14,
        color: '#FFFFFF',
    },
    input: {
        width: 330, 
        height: 42, 
        top: 40, 
        left:10,
        borderWidth: 0.6, 
        borderColor: '#FFFFFF', 
        borderRadius: 21, 
        marginBottom: 10, 
        paddingHorizontal: 10,
        paddingVertical: 5, 
        fontFamily: 'Montserrat-Regular', 
        color: '#FFFFFF',
    },
    passwordContainer: {
        passwordContainer: {
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            width: 330,
            height: 42,
            borderWidth: 0.6, 
            borderColor: '#FFFFFF',
            borderRadius: 21, 
            marginBottom: 10,
            paddingHorizontal: 10, 
            backgroundColor: 'transparent', 
        },
        
    },
    buttonCancel: {
        width: 100,
        height: 42,
        borderRadius: 21,
        borderWidth: 1, 
        borderColor: '#FFFFFF', 
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: 'transparent',
    },
    
    buttonLogin: {
        width: 100,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#738F81',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    
    buttonText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: '#FFFFFF',
        marginLeft: 0, 
    },
    
    buttonContainer: {
        flexDirection: 'row', 
        position: 'absolute',
        top: 530, 
        left:120,
    },
    footer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        top:750 , 
    },
    footerText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: '#FFFFFF',
        marginLeft: 10, 
    },
    footerLink: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color: '#738F81',
        marginLeft: 10, 
    },
    eyeIcon: {
        height: '100%', 
        width: 40,
        marginLeft: 300, 
        marginTop: 3,

    },
    
    checkboxTick: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        
    },
    
   
});

export default styles;
