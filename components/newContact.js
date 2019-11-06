import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import OverlayInput from './overlayInput';

class NewContact extends Component {
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', padding: 10}}>
                <Text style={styles.header}>
                    Nuevo contacto de emergencia
                </Text>
                <Text style={styles.label}>
                    Nombre completo o alias
                </Text>
                <OverlayInput/>
                <Text style={styles.label}>
                    Télefono
                </Text>
                <OverlayInput keyboardType={'number-pad'}/>
                <View
                    style={{
                        height: 50
                    }}
                />
                <Text style={styles.link}>
                    O agrega desde tu dispositivo
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.buttonView}> 
                        <TouchableNativeFeedback  onPress={() => this.props.close()}>
                            <View style={styles.cancelButton}>   
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.buttonView}> 
                        <TouchableNativeFeedback onPress={() => this.props.close()}>
                            <View style={styles.button}>   
                                <Text style={styles.buttonText}>Agregar</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = {
    header: {
        fontSize: 15,
        fontFamily: "Poppins-Bold",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'left'
    },
    link: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: '#4B96E9',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    label: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'left'
    },
    cancelButton: {
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderRadius: 12,
        borderWidth: 1,
        width: '80%',
        height: 50,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 12,
        fontFamily: "Poppins-Bold",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    cancelButtonText: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    buttonView: {
        alignItems: 'flex-start',
        marginTop: 20,
        width: 150,
        alignItems: 'center'
    },
};
export default NewContact;