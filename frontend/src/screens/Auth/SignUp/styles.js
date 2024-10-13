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
        height: 350, 
        top: 250, 
        backgroundColor: 'rgba(115, 143, 129, 0.7)', 
        borderRadius: 40, 
    },
   
  
    input: {
        width: 330, 
        height: 42, 
        top: 30, 
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
   
    buttonCancel: {
        width: 100,
        height: 42,
        borderRadius: 21,
        borderWidth: 1, 
        borderColor: '#FFFFFF', // Màu của border
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
        top: 620, 
        left:120,
    },
    confirmationContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginHorizontal: 20, 
        marginTop: 30, 
      
    },
    confirmationText: {
        color: '#000000', 
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
    },
    link: {
        fontFamily: 'Montserrat-Bold', 
        color: '#3A5A40', 
        fontSize: 12, 
    },
    footer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 20, 
    },
    footerText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: '#FFFFFF',
        marginLeft: 8, 
    },
    footerLink: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color: '#738F81',
        marginLeft: 10, 
     
    },
   
});

export default styles;
