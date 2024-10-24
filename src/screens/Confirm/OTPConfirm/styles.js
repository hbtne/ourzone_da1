// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191919',
    },
    
    arrowButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },
    
    flowerIcon: {
        position: 'absolute',
        bottom: 400, 
        alignItems: 'center',
    },
    button: {
        borderWidth: 1,
        padding: 25,
        borderColor:'#738F81',
        borderRadius: 30,
        width: '100%',
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center', 
    },
    buttonText: {
        color: 'white',
        textAlign: 'start',
        fontSize: 20,
    },
    chooseText: {
        color: 'white',
        marginVertical: 20,
        fontSize: 16,
    },
    otpBoxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end', 
        marginVertical: 20, 
        position: 'relative', 
    },
    otpBox: {
        padding: 10,
        marginRight: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#738F81', 
        height: 45,
        width: 45,
        textAlign: 'center',
        color: 'white', 
        fontSize: 18, 
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0, 
        width: 45, 
        height: 45,
        textAlign: 'center',
        fontSize: 18, 
    },
});

export default styles;
