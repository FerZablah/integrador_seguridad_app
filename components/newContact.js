import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, Modal } from 'react-native';
import OverlayInput from './overlayInput';
import firebase from 'react-native-firebase';
import axios from 'axios';
import BASE_URL from '../base_url.js';
import ContactList from './contactList';

class NewContact extends Component {
    constructor(props) {
        super(props);
        if(props.userToModify){
            this.state = { 
                name: props.userToModify.nombre,
                phone: props.userToModify.telefono
            };
        }
        else{
            this.state = {
                showContactsList: false
            }
        }
    }
    createContact(){
        axios.post(BASE_URL+'contacto/', {
            uid: firebase.auth().currentUser.uid,
            phone: this.state.phone,
            name: this.state.name
        }).then((res) => {
            this.props.addUser(res.data);
            this.props.close();
        }).catch((e) => {
            //Handle duplicate number
            console.log(e);
            this.props.close();
        })
    }
    modifyContact(){
        console.log('calling modify');
        axios.put(BASE_URL+'contacto/', {
            old_phone: this.props.userToModify.telefono,
            phone: this.state.phone,
            name: this.state.name
        }).then((res) => {
            this.props.modifyUser(res.data, this.props.userToModify);
            this.props.close();
        }).catch((e) => {
            //Handle duplicate number
            this.props.close();
            console.log(e.response);
        })
    }
    render(){
        let importContact = (
            <TouchableNativeFeedback onPress={() => this.setState({showContactsList: true})}>
                <Text style={{marginTop: 30}}>Importar de contactos</Text>
            </TouchableNativeFeedback>
        );
        if(this.props.userToModify){
            importContact = null;
        }
        return(
            <View style={{ flex: 1, alignItems: 'center', padding: 10}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showContactsList}
                    onRequestClose={() => {
                        this.setState({ showContactsList: false })
                    }}
                >
                    <ContactList    
                        selectContact={(contact) => {
                            this.setState({name: contact.name, phone: contact.phone});
                        }}
                        close={() => this.setState({ showContactsList: false})}
                    />
                </Modal>
                <Text style={styles.header}>
                    Nuevo contacto de emergencia
                </Text>
                <Text style={styles.label}>
                    Nombre completo o alias
                </Text>
                <OverlayInput
                    changeTxt={(txt) => this.setState({name: txt})}
                    value={this.state.name ? this.state.name : ''}
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
                        height: 50,
                        backgroundColor: 'blue'
                    }}
                />
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
                {importContact}

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
        flex: 1
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
        marginTop: 20,
        width: 150,
        alignItems: 'center'
    },
};
export default NewContact;