import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import OverlayInput from './overlayInput';
import firebase from 'react-native-firebase';
import axios from 'axios';
class NewContact extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { 
            name: props.userToModify.nombre,
            phone: props.userToModify.telefono
        };
    }
    createContact(){
        axios.post('http://localhost:4000/contacto/', {
            uid: firebase.auth().currentUser.uid,
            phone: this.state.phone,
            name: this.state.name
        }).then((res) => {
            this.props.addUser(res.data);
            this.props.close();
        }).catch((e) => {
            //Handle duplicate number
            console.log(e);
        })
    }
    modifyContact(){
        axios.put('http://localhost:4000/contacto/', {
            old_phone: this.props.userToModify.telefono,
            phone: this.state.phone,
            name: this.state.name
        }).then((res) => {
            this.props.modifyUser(res.data, this.props.userToModify);
            this.props.close();
        }).catch((e) => {
            //Handle duplicate number
            console.log(e);
        })
    }
    render(){
        const addFromPhone = this.props.userToModify ?    
            <Text style={styles.link}>
                O agrega desde tu dispositivo
            </Text> : null;
        return(
            <View style={{ flex: 1, alignItems: 'center', padding: 10}}>
                <Text style={styles.header}>
                    Nuevo contacto de emergencia
                </Text>
                <Text style={styles.label}>
                    Nombre completo o alias
                </Text>
                <OverlayInput
                    changeTxt={(txt) => this.setState({name: txt})}
                    value={this.state.name}
                />
                <Text style={styles.label}>
                    Télefono
                </Text>
                <OverlayInput 
                    keyboardType={'number-pad'}
                    value={this.state.phone}
                    changeTxt={(txt) => this.setState({phone: txt})}
                />
                <View
                    style={{
                        height: 50
                    }}
                />
                {addFromPhone}
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.buttonView}> 
                        <TouchableNativeFeedback  onPress={() => this.props.close()}>
                            <View style={styles.cancelButton}>   
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.buttonView}> 
                        <TouchableNativeFeedback onPress={() => !this.props.userToModify ? this.createContact() : this.modifyContact()}>
                            <View style={styles.button}>   
                                <Text style={styles.buttonText}>{!this.props.userToModify ? 'Agregar' : 'Modificar'}</Text>
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