import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        padding: 20,
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
        paddingBottom: 10,
    },
    iconContainer: {
        alignItems: 'center',
    },
    rightButton: {
        marginBottom: 5,
    },
});

export default styles;
