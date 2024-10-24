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
    },
    buttonText: {
        color: 'white',
        textAlign: 'start',
        fontSize:20,
    },
    chooseText: {
        color: 'white',
        marginVertical: 20,
        fontSize: 16,
    },
});

export default styles;
