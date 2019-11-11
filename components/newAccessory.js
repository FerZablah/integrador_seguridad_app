import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import BluetoothList from './bluetoothList';
class NewAccessory extends Component {
    render(){
        return(
            <View style={{flex: 1, padding: 30}}>
                <Text style={styles.title}>
                    Vincular nuevo accesorio
                </Text>
                <Text style={styles.list}>
                    1. Enciende tu nuevo accesorio.
                </Text>
                <Text style={styles.list}>
                    2. Deja presionado durante 10 segundos el botón de tu nuevo accesorio.
                </Text>
                <Text style={styles.list}>
                    3. Busca tu accesorio dentro de la siguiente lista y seleccionalo.
                </Text>
                <Text style={styles.list}>
                    4. ¡Listo tu nuevo accesorio está registrado!
                </Text>
                <BluetoothList />
                
                <View style={styles.buttonView}> 
                    <TouchableNativeFeedback  onPress={() => this.props.close()}>
                        <View style={styles.cancelButton}>   
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}
const styles = {
    title: {
        fontSize: 18,
        fontFamily: "Poppins-Bold",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'left',
        marginBottom: '5%',
    },
    list: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'left',
        marginBottom: '3%',
    },
    cancelButtonText: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    cancelButton: {
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonView: {
        alignItems: 'flex-start',
        marginTop: 20,
        width: 150,
        alignItems: 'center'
    },
};
export default NewAccessory;